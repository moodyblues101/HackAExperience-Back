"use strict";

const createJsonError = require("../../errors/create-json-error");
const { findAllReviews } = require("../../repositories/reviews-repository");

async function getReviews(req, res) {
    try {
        const reviews = await findAllReviews();

        res.status(200);
        res.send({ reviewsData: reviews });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getReviews;