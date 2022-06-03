"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findBookingByIdDate,
} = require("../../repositories/bookings-repository");

const schemaId = Joi.number().integer().positive().required();

async function getBookingsByIdDate(req, res) {
  try {
    const { idDate } = req.params;
    await schemaId.validateAsync(idDate);

    const bookings = await findBookingByIdDate(idDate);
    if (!bookings) {
      throwJsonError(400, "No existen reservas con esa fecha");
    }

    res.status(200);
    res.send(bookings);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBookingsByIdDate;
