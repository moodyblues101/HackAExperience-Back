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

async function patchBusinessById(req, res) {
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

    const updatedBusiness = {
      ...business,
      ...body,
    };

    await updateBusiness(id, updatedBusiness);

    res.status(200).send({ ...updatedBusiness });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = patchBusinessById;
