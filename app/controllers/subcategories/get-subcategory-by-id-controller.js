"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findSubcategoryById } = require("../../repositories/subcategories-repository");

const schemaId = Joi.number().integer().positive().required();

async function getSubcategoryById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const subCategory = await findSubcategoryById(id);
        if (!subCategory) {
            throwJsonError(404, 'No existe la subcategoria');
        }

        res.status(200).send(subCategory);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getSubcategoryById;