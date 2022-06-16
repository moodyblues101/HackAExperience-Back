"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findReviewById } = require("../../repositories/reviews-repository");

const schemaId = Joi.number().integer().positive().required();

async function getReviewById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const review = await findReviewById(id);
        if (!review) {
            throwJsonError(404, 'No existe la review');
        }

        res.status(200).send(review);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getReviewById;