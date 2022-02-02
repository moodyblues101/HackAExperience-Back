"use strict";

const express = require('express');
const router = express.Router();
const getBookings = require('../controllers/bookings/get-bookings-controller');
const deleteBookingById = require('../controllers/bookings/delete-booking-by-id-controller');
const getBookingById = require('../controllers/bookings/get-booking-by-id-controller');
const validateAuth = require('../middleware/validate-auth');

// Endpoints publicos
// Endpoints privados
router.route('/').all(validateAuth).get(getBookings);
router.route('/:id').all(validateAuth).get(getBookingById);
router.route('/:id').all(validateAuth).delete(deleteBookingById);

module.exports = router;