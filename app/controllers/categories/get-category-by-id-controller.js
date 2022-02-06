"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findCategoryById } = require("../../repositories/categories-repository");

const schemaId = Joi.number().integer().positive().required();

async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const category = await findCategoryById(id);
        if (!category) {
            throwJsonError(404, 'No existe la categoria');
        }

        res.status(200).send(category);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getCategoryById;