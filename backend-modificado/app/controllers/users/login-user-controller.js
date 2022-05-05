"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserByEmail } = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(4).max(120).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);

    const { username, password } = body;
    const user = await findUserByEmail(username);
    if (!user) {
      throwJsonError(403, "No existe un usuario con ese mail y/o password");
    }
    const { id, name, role, password: passwordHash, verifiedAt } = user;
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    if (!isValidPassword) {
      throwJsonError(403, "No existe un usario con ese mail y/o password");
    }
    if (!verifiedAt) {
      //TODO Enviar un email para que el usuario haga una review de experiencia pasadas
      throwJsonError(401, "Verifique su cuenta para poder acceder a la web");
    }
    const { JWT_SECRET } = process.env;
    const tokenPayload = { id, name, role, ejemplo: "asdf" };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: 3600000 });

    const response = {
      id: id,
      role: role,
      accessToken: token,
      expiresIn: 3600000,
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
