"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { addReview } = require("../../repositories/reviews-repository");
const {
  findExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  comment: Joi.string().min(5).max(255).required(),
  rating: Joi.number().integer().min(0).max(5).required(),
});

async function createReviewByExperienceId(req, res) {
  try {
    const { id } = req.auth;
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const experience = findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(400, "La experiencia no existe");
    }
    const { body } = req;
    await schemaBody.validateAsync(body);
    const { comment, rating } = body;
    // const { comment } = body;

    const reviewId = await addReview(id, experienceId, comment, rating);
    // const reviewId = await addReview(id, experienceId, comment);
    res.status(201).send({ reviewId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createReviewByExperienceId;
