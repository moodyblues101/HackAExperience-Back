"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs/dist/bcrypt");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");
const { sendMailRegister } = require("../../helpers/sendgrid");
// const { sendMailRegister } = require("../../helpers/mail-smtp");

const schemaUser = Joi.object().keys({
  name: Joi.string().min(3).max(120).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().min(6).max(160),
  password: Joi.string().min(4).max(20).required(), // look for improvement in doc
  verifyPassword: Joi.ref("password"),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schemaUser.validateAsync(body);
    const { name, bio, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {
      throwJsonError(400, "Ya existe un usuario registrado con ese mail");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = randomstring.generate(64);
    const userDB = { name, bio, email, passwordHash, verificationCode };
    const userId = await createUser(userDB);
    await sendMailRegister(name, email, verificationCode);
    const activationLink = `http://localhost:3000/api/v1/users/activation?code=${verificationCode}`;
    res.status(201);
    res.send({
      id: userId,
      urlActivation: activationLink, //!delete
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
