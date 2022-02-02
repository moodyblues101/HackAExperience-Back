"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findBookingById } = require("../../repositories/bookings-repository");

const schemaId = Joi.number().integer().positive().required();

async function getBookingById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const booking = await findBookingById(id);
        if (!booking) {
            throwJsonError(400, 'No existe la reserva');
        }

        res.status(200);
        res.send(booking);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getBookingById;