"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  addBusiness,
  findBusinessByName,
} = require("../../repositories/business-repository");

const schemaBusiness = Joi.object().keys({
  name: Joi.string().min(3).max(150).required(),
});

async function createBusiness(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { body } = req;

    // console.log(body);

    await schemaBusiness.validateAsync(body);

    const business = await findBusinessByName(body.name);

    if (business.length === 1) {
      throwJsonError(404, "Ya existe una empresa con ese nombre");
    }
    const businessId = await addBusiness(body);

    res
      .status(201)
      .send({ message: `Empresa ${businessId} creada correctamente` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createBusiness;
