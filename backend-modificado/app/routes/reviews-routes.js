"use strict";

const express = require("express");
const deleteReviewById = require("../controllers/reviews/delete-review-by-id-controller");
const getReviewsByIdCategory = require("../controllers/reviews/get-reviews-by-id-category-controller");
const getReviewById = require("../controllers/reviews/get-review-by-id-controller");
const getReviews = require("../controllers/reviews/get-reviews-controller");
const validateAuth = require("../middleware/validate-auth");
const router = express.Router();

// Endpoint Públicos
router.route("/").get(getReviews);
router.route("/:id").get(getReviewById);
router.route("/category/:idCat").get(getReviewsByIdCategory);

// Endpoint Privados
router.route("/:id").all(validateAuth).delete(deleteReviewById);

module.exports = router;
