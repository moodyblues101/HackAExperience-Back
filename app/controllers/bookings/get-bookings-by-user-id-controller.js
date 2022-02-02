"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findBookingsByUserId } = require("../../repositories/bookings-repository");
const { findUserById } = require("../../repositories/users-repository");

const schemaId = Joi.number().integer().positive().required();

async function getBookingsByUserId(req, res) {
    try {
        const { userId } = req.params;
        await schemaId.validateAsync(userId);
        const user = await findUserById(userId);
        if (!user) {
            throwJsonError(404, 'El usuario no existe')
        }

        const bookings = await findBookingsByUserId(userId)
        if (bookings.length === 0) {
            throwJsonError(404, `No existen reservas para el usuario con id ${userId}`);
        }
        res.status(200).send(bookings);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getBookingsByUserId;