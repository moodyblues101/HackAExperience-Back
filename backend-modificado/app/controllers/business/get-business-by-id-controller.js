"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findBusinessById } = require("../../repositories/business-repository");

const schemaId = Joi.number().integer().positive().required();

async function getBusinessById(req, res) {
  try {
    const { id } = req.params;
    await schemaId.validateAsync(id);
    const business = await findBusinessById(id);
    if (!business) {
      throwJsonError(404, "No existe la empresa");
    }

    res.status(200).send(business);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBusinessById;
