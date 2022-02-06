"use strict";

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findExperienceById } = require('../../repositories/experiences-repository');
const { getRating } = require('../../repositories/reviews-repository');

const schema = Joi.number().integer().positive().required();

async function getAvarageRatingByExperienceId(req, res) {
    try {
        const { experienceId } = req.params;
        await schema.validateAsync(experienceId);
        const experience = await findExperienceById(experienceId);
        if (!experience) {
            throwJsonError(400, 'La experiencia no existe')
        }
        const rating = await getRating(experienceId);

        res.status(200).send(rating);
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getAvarageRatingByExperienceId;