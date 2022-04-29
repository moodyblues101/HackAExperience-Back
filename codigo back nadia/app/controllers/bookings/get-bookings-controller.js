"use strict";

const { findAllBookings } = require("../../repositories/bookings-repository");

async function getBookings(req, res) {
    try {
        const bookings = await findAllBookings();

        res.status(200);
        res.send({ bookingsData: bookings });
    } catch (error) {
        res.status(400);
        console.log(error.message);
    }
}

module.exports = getBookings;