"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const {
  findUserById,
  updateUserBioById,
} = require("../../repositories/users-repository");

const schemaUser = Joi.object().keys({
  bio: Joi.string().min(6).max(160),
});

async function patchUserBioById(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { bio } = body;
    await schemaUser.validateAsync(body);

    const userLogged = await findUserById(id);

    const updatedUser = {
      ...userLogged,
      ...body,
    };

    await updateUserBioById({ id, bio });

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

module.exports = patchUserBioById;
