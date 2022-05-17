"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findExperienceById,
  updateVisitsWhenExperienceIsFound,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getExperienceById(req, res) {
  try {
    const { id } = req.params;
    await schemaId.validateAsync(id);
    const experience = await findExperienceById(id);
    if (!experience) {
      throwJsonError(400, "No existe la experiencia");
    }
    await updateVisitsWhenExperienceIsFound(id);

    res.status(200);
    res.send(experience);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getExperienceById;
