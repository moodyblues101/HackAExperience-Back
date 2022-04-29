"use strict";

const express = require('express');
const router = express.Router();
const getBookings = require('../controllers/bookings/get-bookings-controller');

router.route('/').get(getBookings);


module.exports = router;