"use strict";

const express = require('express');
const router = express.Router();
const getExperiences = require('../controllers/experiences/get-experiences-controller');
const getExperienceById = require('../controllers/experiences/get-experience-by-id-controller');
const validateAuth = require('../middleware/validate-auth');
const createReviewByExperienceId = require('../controllers/experiences/create-review-by-experience-id-controller');
const getReviewsByExperienceId = require('../controllers/experiences/get-reviews-by-experience-id');
const createExperience = require('../controllers/experiences/create-experience-controller');
const getAvarageRatingByExperienceId = require('../controllers/experiences/get-avarage-rating-by-experience-id-controller');
const updateExperienceById = require('../controllers/experiences/update-experience-by-id-controller');
const createBookingByExperienceId = require('../controllers/bookings/create-booking-by-experience-id-controller');
const getBookingsByExperienceId = require('../controllers/bookings/get-bookings-by-experience-id-controller');
const uploadExperienceImageById = require('../controllers/experiences/upload-experience-image-by-id-controller');

// Endpoints publicos
router.route('/').get(getExperiences);
router.route('/:id').get(getExperienceById);
router.route('/:experienceId/reviews').get(getReviewsByExperienceId);
router.route('/:experienceId/rating').get(getAvarageRatingByExperienceId);
// Endpoints privados
router.route('/').all(validateAuth).post(createExperience);
router.route('/:experienceId').all(validateAuth).put(updateExperienceById);
router.route("/:experienceId/reviews").all(validateAuth).post(createReviewByExperienceId);
router.route('/:experienceId/bookings').all(validateAuth).post(createBookingByExperienceId)
router.route('/:experienceId/bookings').all(validateAuth).get(getBookingsByExperienceId)

module.exports = router;