"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const {
  findUserById,
  updateUserNameById,
} = require("../../repositories/users-repository");

const schemaUser = Joi.object().keys({
  name: Joi.string().min(3).max(120),
});

async function patchUserNameById(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { name } = body;
    await schemaUser.validateAsync(body);

    const userLogged = await findUserById(id);

    const updatedUser = {
      ...userLogged,
      ...body,
    };

    await updateUserNameById({ id, name });

    // if (email !== userLogged.email) {
    //   const verificationCode = randomstring.generate(64);
    //   await updateVerficationCode(id, verificationCode);
    //   await sendMailRegister(
    //     userLogged.name,
    //     userLogged.email,
    //     verificationCode
    //   );
    // }

    res.status(200).send({ ...updatedUser });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = patchUserNameById;
