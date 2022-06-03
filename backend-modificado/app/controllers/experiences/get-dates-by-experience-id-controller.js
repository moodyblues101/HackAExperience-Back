"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findDatesExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getDatesByExperienceId(req, res) {
  try {
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);

    const datesExp = await findDatesExperienceById(experienceId);
    if (!datesExp) {
      throwJsonError(400, "No existen fechas para la experiencia");
    }

    res.status(200);
    res.send(datesExp);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getDatesByExperienceId;
