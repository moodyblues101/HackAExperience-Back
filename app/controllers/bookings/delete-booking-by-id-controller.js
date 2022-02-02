"use strict"

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findBookingById, removeBookingById } = require("../../repositories/bookings-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteBookingById(req, res) {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const booking = await findBookingById(id);
        if (!booking) {
            throwJsonError(400, 'Esta reserva no existe');
        }

        await removeBookingById(id);

        res.status(200)
        res.send({ message: `La reserva con id ${id} ha sido borrada correctamente` });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = deleteBookingById;