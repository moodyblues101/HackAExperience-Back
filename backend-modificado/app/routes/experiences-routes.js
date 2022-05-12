"use strict";

const express = require("express");
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");
const getExperiences = require("../controllers/experiences/get-experiences-controller");
const getExperienceById = require("../controllers/experiences/get-experience-by-id-controller");
const createReviewByExperienceId = require("../controllers/reviews/create-review-by-experience-id-controller");
const getImagesByExperienceId = require("../controllers/experiences/get-impages-by-id-experience-controller");
const getReviewsByExperienceId = require("../controllers/reviews/get-reviews-by-experience-id");
const createExperience = require("../controllers/experiences/create-experience-controller");
const getAvarageRatingByExperienceId = require("../controllers/reviews/get-avarage-rating-by-experience-id-controller");
const createBookingByExperienceId = require("../controllers/bookings/create-booking-by-experience-id-controller");
const getBookingsByExperienceId = require("../controllers/bookings/get-bookings-by-experience-id-controller");
const patchExperienceById = require("../controllers/experiences/patch-experience-by-id-controller");
const updateExperienceById = require("../controllers/experiences/update-experience-by-id-controller");
const deleteExperienceById = require("../controllers/experiences/delete-experience-by-id-controller");
const uploadExperienceImageById = require("../controllers/experiences/upload-experience-image-by-id-controller");
const uploadMultipleExperienceImages = require("../controllers/experiences/upload-multiple-experience-image-by-id-controller");

// Endpoints publicos
router.route("/").get(getExperiences);
router.route("/:id").get(getExperienceById);
router.route("/:experienceId/images").get(getImagesByExperienceId);
router.route("/:experienceId/reviews").get(getReviewsByExperienceId);
router.route("/:experienceId/rating").get(getAvarageRatingByExperienceId);
// Endpoints privados
router.route("/").all(validateAuth).post(createExperience);
// router.route("/").post(createExperience);
router.route("/:id").all(validateAuth).delete(deleteExperienceById);
// router.route("/:id").delete(deleteExperienceById);
router.route("/:experienceId").all(validateAuth).put(updateExperienceById);
router.route("/:experienceId").all(validateAuth).patch(patchExperienceById);
router
  .route("/:experienceId/reviews")
  .all(validateAuth)
  .post(createReviewByExperienceId);
router
  .route("/:experienceId/bookings")
  .all(validateAuth)
  .post(createBookingByExperienceId);
router
  .route("/:experienceId/bookings")
  .all(validateAuth)
  .get(getBookingsByExperienceId);
router
  .route("/:experienceId/image")
  .all(validateAuth)
  .post(uploadExperienceImageById);
router
  .route("/:experienceId/images")
  .all(validateAuth)
  .post(uploadMultipleExperienceImages);

module.exports = router;
