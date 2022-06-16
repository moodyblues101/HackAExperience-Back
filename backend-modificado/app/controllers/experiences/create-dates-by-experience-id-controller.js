"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  addDatesByExperienceId,
  findExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

const schemaDate = Joi.object().keys({
  eventStartDate: Joi.date().iso().required(),
  eventEndDate: Joi.date().iso().required(),
  totalPlaces: Joi.number().integer().positive().max(1000).required(),
});

async function createDatesByExperienceId(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);

    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "No existe la experiencia");
    }
    const { body } = req;

    await schemaDate.validateAsync(body);

    const { eventStartDate, eventEndDate } = body;

    const now = new Date().getTime();
    const startDate = new Date(eventStartDate).getTime();
    const endDate = new Date(eventEndDate).getTime();

    if (startDate < endDate) {
      if (startDate < now || endDate < now) {
        throwJsonError(404, "Fechas incorrectas");
      }
    } else {
      throwJsonError(404, "Fechas incorrectas");
    }

    await addDatesByExperienceId(body, experienceId);

    res.status(201).send({
      message: `Fechas añadidas correctamente`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createDatesByExperienceId;
