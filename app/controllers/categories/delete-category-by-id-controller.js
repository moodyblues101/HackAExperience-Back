"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findCategoryById, removeCategoryById } = require("../../repositories/categories-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteCategoryById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { id } = req.params;
        await schemaId.validateAsync(id);
        const category = await findCategoryById(id);
        if (!category) {
            throwJsonError(404, 'No existe la categoria');
        }

        await removeCategoryById(id);

        res.status(200).send(
            { message: `La categoria con ${id} ha sido eliminada correctamente.` }
        );
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = deleteCategoryById;