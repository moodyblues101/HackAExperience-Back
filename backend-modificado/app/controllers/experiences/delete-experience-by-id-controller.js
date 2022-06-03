"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findExperienceById,
  removeExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().positive().required();

async function deleteExperienceById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schemaId.validateAsync(id);

    const experience = await findExperienceById(id);
    if (!experience) {
      throwJsonError(404, "La experiencia no existe");
    }

    await removeExperienceById(id);

    res.status(200).send({
      message: `La experiencia con id ${id} ha sido borrada correctamente`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteExperienceById;
