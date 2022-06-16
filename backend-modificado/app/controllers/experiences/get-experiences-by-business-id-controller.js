"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findBusinessById } = require("../../repositories/business-repository");
const {
  findExperiencesByBusinessId,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getExperiencesByBusinessId(req, res) {
  try {
    const { businessId } = req.params;
    await schemaId.validateAsync(businessId);
    const business = await findBusinessById(businessId);
    if (!business) {
      throwJsonError(404, "La empresa no existe");
    }
    const experiences = await findExperiencesByBusinessId(businessId);
    if (experiences.length === 0) {
      throwJsonError(
        404,
        `No existen experiencias que pertenezcan a la categoria con id ${businessId}`
      );
    }
    res.status(200).send(experiences);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getExperiencesByBusinessId;
