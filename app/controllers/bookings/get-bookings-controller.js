"use strict";

const createJsonError = require("../../errors/create-json-error");
const { findAllBookings } = require("../../repositories/bookings-repository");

async function getBookings(req, res) {
    try {
        const bookings = await findAllBookings();

        res.status(200);
        res.send({ bookingsData: bookings });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getBookings;