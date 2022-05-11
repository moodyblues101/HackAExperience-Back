"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findReviewsByIdCategory,
} = require("../../repositories/reviews-repository");

const schemaId = Joi.number().integer().positive().required();

async function getReviewsByIdCategory(req, res) {
  try {
    const { idCat } = req.params;
    await schemaId.validateAsync(idCat);
    const reviews = await findReviewsByIdCategory(idCat);

    if (!reviews) {
      throwJsonError(404, "No existen reviews");
    }

    res.status(200).send(reviews);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getReviewsByIdCategory;
