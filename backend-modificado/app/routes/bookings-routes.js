"use strict";

const express = require("express");
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");
const getBookings = require("../controllers/bookings/get-bookings-controller");
const deleteBookingById = require("../controllers/bookings/delete-booking-by-id-controller");
const getBookingById = require("../controllers/bookings/get-booking-by-id-controller");
const getBookingsByIdDate = require("../controllers/bookings/get-bookings-by-id-date-controller");

// Endpoints publicos
router.route("/dates/:idDate").get(getBookingsByIdDate);

// Endpoints privados
router.route("/").all(validateAuth).get(getBookings);
router.route("/:id").all(validateAuth).get(getBookingById);
router.route("/:id").all(validateAuth).delete(deleteBookingById);

module.exports = router;
