"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAllSubcategories } = require("../../repositories/subcategories-repository");

async function getSubcategories(req, res) {
    try {
        const subCategories = await findAllSubcategories();
        if (subCategories.length === 0) {
            throwJsonError(404, 'No existen subcategorias');
        }
        res.status(200);
        res.send({ subCategoriesData: subCategories });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getSubcategories;