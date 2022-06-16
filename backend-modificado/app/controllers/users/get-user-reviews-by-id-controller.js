"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findReviewsByUserId } = require("../../repositories/reviews-repository");
const { findUserById } = require("../../repositories/users-repository");

const schemaId = Joi.number().integer().positive().required();

async function getUserReviewsById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id)

        const user = await findUserById(id);
        if (!user) {
            throwJsonError(400, 'Este usuario no existe');
        }
        const reviews = await findReviewsByUserId(id);
        if (reviews.length === 0) {
            throwJsonError(404, `No existen reviews para el usuario con id ${id}`);
        }
        res.status(200).send(reviews);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getUserReviewsById;