"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findCategoryById,
} = require("../../repositories/categories-repository");
const {
  findExperiencesByCategoryId,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getExperiencesByCategoryId(req, res) {
  try {
    const { categoryId } = req.params;
    await schemaId.validateAsync(categoryId);
    const category = await findCategoryById(categoryId);
    if (!category) {
      throwJsonError(404, "Esa categoría no existe");
    }
    const experiences = await findExperiencesByCategoryId(categoryId);
    if (experiences.length === 0) {
      throwJsonError(
        404,
        `No existen experiencias que pertenezcan a la categoria con id ${categoryId}`
      );
    }
    res.status(200).send(experiences);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getExperiencesByCategoryId;
