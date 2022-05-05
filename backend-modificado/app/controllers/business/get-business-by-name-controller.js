"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findBusinessByName,
} = require("../../repositories/business-repository");

const schemaName = Joi.string().min(3).max(150).required();

//comprueba si hay una empresa con ese nombre, si la hay lanza el error

async function getBusinessByName(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { name } = req.params;

    await schemaName.validateAsync(name);
    const business = await findBusinessByName(name);
    // if (business) {
    //   throwJsonError(404, "Ya existe una empresa con ese nombre");
    // }

    res.status(200).send(business);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBusinessByName;
