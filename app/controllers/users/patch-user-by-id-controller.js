"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const { sendMailRegister } = require("../../helpers/sendgrid");
const { findUserById, updateUserById, updateVerficationCode } = require("../../repositories/users-repository");

const schemaUser = Joi.object().keys({
    name: Joi.string().min(3).max(120),
    email: Joi.string().email(),
    bio: Joi.string().min(6).max(160),
    password: Joi.string().optional(),
    repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
    password: Joi.string().min(4).max(20).required(),
    repeatPassword: Joi.ref('password'),
});

async function patchUserById(req, res) {
    try {
        const { auth, body } = req;
        const { id } = auth;
        const { name, email, bio, password, repeatPassword } = body;
        await schemaUser.validateAsync(body);

        const userLogged = await findUserById(id);

        let updatePassword = userLogged.password;
        if (password) {
            await schemaPassword.validateAsync({ password, repeatPassword });
            const passwordHash = await bcrypt.hash(password, 12);

            updatePassword = passwordHash;
        }

        const updatedUser = {
            ...userLogged,
            ...body,
        }

        await updateUserById({ id, name, email, bio, password: updatePassword });

        if (email !== userLogged.email) {
            const verificationCode = randomstring.generate(64);
            await updateVerficationCode(id, verificationCode);
            await sendMailRegister(name, email, verificationCode);
        }

        res.status(200).send({ ...updatedUser });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = patchUserById;