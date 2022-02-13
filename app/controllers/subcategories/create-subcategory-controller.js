"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const { isAdmin } = require("../../helpers/utils");
const { addSubcategory } = require("../../repositories/subcategories-repository");

const schemaSubcategory = Joi.object().keys({
    name: Joi.string().min(3).max(120).required(),
    description: Joi.string().min(4).max(400),
});

async function createSubcategory(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);
        const { body } = req;
        await schemaSubcategory.validateAsync(body);
        const subCategoryId = await addSubcategory(body);

        res.status(201).send(
            { message: `Subcategoria ${subCategoryId} creada correctamente` }
        );
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = createSubcategory;