"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findSubcategoryById, updateSubcategory } = require("../../repositories/subcategories-repository");

const schemaId = Joi.number().integer().positive().required();
const schemaSubcategory = Joi.object().keys({
    name: Joi.string().min(3).max(120).required(),
    description: Joi.string().min(4).max(400),
});

async function updateSubcategoryById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { id } = req.params;
        await schemaId.validateAsync(id);
        const subCategory = await findSubcategoryById(id);
        if (!subCategory) {
            throwJsonError(404, 'La subcategoria no existe');
        }
        const { body } = req;
        await schemaSubcategory.validateAsync(body);

        await updateSubcategory(id, body);
        const { name } = body;

        res.status(200);
        res.send({ message: `La subcategoria con id ${id} y nombre ${name} ha sido actualizada correctamente` });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = updateSubcategoryById;