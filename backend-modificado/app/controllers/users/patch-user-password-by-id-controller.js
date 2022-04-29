"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
// const { sendMailRegister } = require("../../helpers/sendgrid");
const {
  findUserById,
  updateUserPasswordById,
  updateVerficationCode,
} = require("../../repositories/users-repository");

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function patchUserPasswordById(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { password, repeatPassword } = body;

    const userLogged = await findUserById(id);

    let updatePassword = userLogged.password;
    // if (password) {
    await schemaPassword.validateAsync({ password, repeatPassword });
    const passwordHash = await bcrypt.hash(password, 12);

    updatePassword = passwordHash;
    // }

    const updatedUser = {
      ...userLogged,
      ...body,
    };

    await updateUserPasswordById({ id, password: updatePassword });

    // if (email !== userLogged.email) {
    //     const verificationCode = randomstring.generate(64);
    //     await updateVerficationCode(id, verificationCode);
    //     await sendMailRegister(userLogged.name, userLogged.email, verificationCode);
    // }

    res.status(200).send({ ...updatedUser });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = patchUserPasswordById;
