"use strict";

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const createJsonError = require('../../errors/create-json-error');
const { findUserById, findUserByEmail, updateUserById, updateVerficationCode } = require('../../repositories/users-repository');
const throwJsonError = require('../../errors/throw-json-error');
const { sendMailRegister } = require('../../helpers/sendgrid');

const schemaUser = Joi.object().keys({
    name: Joi.string().min(3).max(120).required(),
    email: Joi.string().email().required(),
    bio: Joi.string().min(6).max(160),
    password: Joi.string().optional(),
    repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
    password: Joi.string().min(4).max(20).required(),
    repeatPassword: Joi.ref('password'),
})

async function updateUser(req, res) {
    try {
        const { auth, body } = req;
        const { id } = auth;
        const { name, email, password, repeatPassword } = body;
        await schemaUser.validateAsync(body);

        const userLogged = await findUserById(id);
        const userExist = await findUserByEmail(email);

        if (userExist && userExist !== id) {
            throwJsonError(409, 'Ya existe un usuario con ese email');
        }
        let updatePassword = userLogged.password;
        if (password) {
            await schemaPassword.validateAsync({ password, repeatPassword });
            const passwordHash = await bcrypt.hash(password, 12);

            updatePassword = passwordHash;
        }
        await updateUserById({ id, name, email, password: updatePassword });

        if (email !== userLogged.email) {
            const verificationCode = randomstring.generate(64);
            await updateVerficationCode(id, verificationCode);
            await sendMailRegister(name, email, verificationCode);
        }
        res.status(200).send({ message: 'Usuario actualizado correctamente' });

    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = updateUser;