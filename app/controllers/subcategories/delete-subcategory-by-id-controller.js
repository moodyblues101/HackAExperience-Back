"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findSubcategoryById, removeSubcategoryById } = require("../../repositories/subcategories-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteSubcategoryById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { id } = req.params;
        await schemaId.validateAsync(id);
        const subCategory = await findSubcategoryById(id);
        if (!subCategory) {
            throwJsonError(404, 'No existe la subcategoria');
        }

        await removeSubcategoryById(id)

        res.status(200).send(
            { message: `La subcategoria con ${id} ha sido eliminada correctamente.` }
        );
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = deleteSubcategoryById;