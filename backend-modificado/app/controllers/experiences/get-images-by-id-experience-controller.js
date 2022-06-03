"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findImagesByExperienceId,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getImagesByExperienceId(req, res) {
  try {
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const imagesExperience = await findImagesByExperienceId(experienceId);
    if (!imagesExperience) {
      throwJsonError(400, "No existen imágenes para la experiencia");
    }
    res.status(200);
    res.send(imagesExperience);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getImagesByExperienceId;
