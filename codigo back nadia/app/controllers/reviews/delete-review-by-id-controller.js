'use strict';

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findReviewById, removeReviewById } = require("../../repositories/reviews-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteReviewById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const review = await findReviewById(id);
        if (!review) {
            throwJsonError(404, 'Esta review no existe');
        }
        await removeReviewById(id);
        res.status(200)
        res.send({ message: `La review con id ${id} ha sido borrada correctamente` });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = deleteReviewById;