"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findCategoryById, updateCategory } = require("../../repositories/categories-repository");

const schemaId = Joi.number().integer().positive().required();
const schemaCategory = Joi.object().keys({
    name: Joi.string().min(3).max(120),
    description: Joi.string().min(4).max(400),
});

async function patchCategoryById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { id } = req.params;
        await schemaId.validateAsync(id);
        const category = await findCategoryById(id);
        if (!category) {
            throwJsonError(404, 'La categoria no existe');
        }
        const { body } = req;
        await schemaCategory.validateAsync(body);

        const updatedCategory = {
            ...category,
            ...body,
        }

        await updateCategory(id, updatedCategory);

        res.status(200).send({ ...updatedCategory });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = patchCategoryById;