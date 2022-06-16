"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findDatesByIdDate,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getDateExperienceByDateId(req, res) {
  try {
    const { idDate } = req.params;
    await schemaId.validateAsync(idDate);

    const dateExp = await findDatesByIdDate(idDate);
    if (!dateExp) {
      throwJsonError(400, "No existe esa id de fecha");
    }

    res.status(200);
    res.send(dateExp);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getDateExperienceByDateId;
