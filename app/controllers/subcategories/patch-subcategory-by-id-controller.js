"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findSubcategoryById } = require("../../repositories/subcategories-repository");
const updateSubcategoryById = require("./update-subcategory-by-id-controller");

const schemaId = Joi.number().integer().positive().required();
const schemaSubcategory = Joi.object().keys({
    name: Joi.string().min(3).max(120),
    description: Joi.string().min(4).max(400),
});

async function patchSubategoryById(req, res) {
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

        const updatedSubcategory = {
            ...subCategory,
            ...body,
        }

        await updateSubcategoryById(id, updatedSubcategory);

        res.status(200).send({ ...updatedSubcategory });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = patchSubategoryById;