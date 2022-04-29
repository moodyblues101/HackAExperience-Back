"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAllCategories } = require("../../repositories/categories-repository");

async function getCategories(req, res) {
    try {
        const categories = await findAllCategories();
        if (categories.length === 0) {
            throwJsonError(404, 'No existen categorias');
        }
        res.status(200)
        res.send({ categoriesData: categories });
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getCategories;