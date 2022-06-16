"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAllBusiness } = require("../../repositories/business-repository");

async function getBusiness(req, res) {
  try {
    const business = await findAllBusiness();
    if (business.length === 0) {
      throwJsonError(404, "No existen empresas");
    }
    res.status(200);
    res.send(business);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBusiness;
