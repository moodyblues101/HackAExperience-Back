"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findBusinessById,
  updateBusiness,
} = require("../../repositories/business-repository");

const schemaId = Joi.number().integer().positive().required();
const schemaBusiness = Joi.object().keys({
  name: Joi.string().min(3).max(150).required(),
});

async function updateBusinessById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schemaId.validateAsync(id);
    const business = await findBusinessById(id);
    if (!business) {
      throwJsonError(404, "La empresa no existe");
    }
    const { body } = req;
    await schemaBusiness.validateAsync(body);

    await updateBusiness(id, body);
    const { name } = body;

    res.status(200);
    res.send({
      message: `La empresa con id ${id} y nombre ${name} ha sido actualizada correctamente`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateBusinessById;
