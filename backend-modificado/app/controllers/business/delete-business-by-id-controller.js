"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findBusinessById,
  removeBusinessById,
} = require("../../repositories/business-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteBusinessById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schemaId.validateAsync(id);
    const business = await findBusinessById(id);
    if (!business) {
      throwJsonError(404, "No existe la empresa");
    }

    await removeBusinessById(id);

    res
      .status(200)
      .send({
        message: `La empresa con ${id} ha sido eliminada correctamente`,
      });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteBusinessById;
