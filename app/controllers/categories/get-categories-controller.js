"use strict";

const createJsonError = require("../../errors/create-json-error");
const { findAllCategories } = require("../../repositories/categories-repository");

async function getCategories(req, res) {
    try {
        const categories = await findAllCategories();

        res.status(200)
        res.send({ categoriesData: categories });
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getCategories;