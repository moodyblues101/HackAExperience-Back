"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const { isAdmin } = require("../../helpers/utils");
const { addCategory } = require("../../repositories/categories-repository");

const schemaCategory = Joi.object().keys({
  name: Joi.string().min(3).max(120).required(),
  description: Joi.string().min(4).max(400),
});

async function createCategory(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { body } = req;

    await schemaCategory.validateAsync(body);
    const categoryId = await addCategory(body);

    res
      .status(201)
      .send({ message: `Categoria ${categoryId} creada correctamente` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createCategory;
