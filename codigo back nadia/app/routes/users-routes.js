"use strict";

const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/users/register-user-controller')
const getUsers = require('../controllers/users/get-users-controller');
const getUserProfile = require('../controllers/users/get-user-profile-controller');
const validateUser = require('../controllers/users/activate-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const validateAuth = require('../middleware/validate-auth');
const deleteUserById = require('../controllers/users/delete-user-by-id-controller');
const uploadImageProfile = require('../controllers/users/upload-image-profile-controller');
const updateUser = require('../controllers/users/update-user-controller');
const getUserReviewsById = require('../controllers/users/get-user-reviews-by-id-controller');
const randomUser = require('../controllers/users/random-user-controller');
const getBookingsByUserId = require('../controllers/bookings/get-bookings-by-user-id-controller');
const patchUserById = require('../controllers/users/patch-user-by-id-controller');

// Endpoint Públicos
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);
router.route('/:id/reviews').get(getUserReviewsById);
router.route('/random').get(randomUser)

// Endpoint Privados
router.route('/').all(validateAuth).get(getUsers);
router.route('/').all(validateAuth).put(updateUser);
router.route('/').all(validateAuth).patch(patchUserById);
router.route('/profile').all(validateAuth).get(getUserProfile);
router.route('/:id').all(validateAuth).delete(deleteUserById);
router.route('/upload').all(validateAuth).post(uploadImageProfile);
router.route('/:userId/bookings').all(validateAuth).get(getBookingsByUserId);
// PUT api/v1/users/:id/avatar

module.exports = router;