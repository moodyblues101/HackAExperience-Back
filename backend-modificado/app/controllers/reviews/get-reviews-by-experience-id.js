"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findExperienceById,
} = require("../../repositories/experiences-repository");
const {
  findReviewsByExperienceId,
} = require("../../repositories/reviews-repository");

const schemaId = Joi.number().integer().positive().required();

async function getReviewsByExperienceId(req, res) {
  try {
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "La experiencia no existe");
    }
    const reviews = await findReviewsByExperienceId(experienceId);
    if (reviews.length === 0) {
      throwJsonError(
        404,
        `No existen reviews para la experiencia con id ${experienceId}`
      );
    }
    res.status(200).send(reviews);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getReviewsByExperienceId;
