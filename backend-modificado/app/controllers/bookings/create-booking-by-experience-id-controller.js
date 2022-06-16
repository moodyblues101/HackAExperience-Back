"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  addBookingByExperienceId,
} = require("../../repositories/bookings-repository");
const {
  findDatesByIdDate,
  findExperienceById,
  updateExperienceWhenBookingIsCreated,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().positive().required();

async function createBookingByExperienceId(req, res) {
  try {
    const { id } = req.auth;
    const { experienceId } = req.params;
    const { body } = req;

    // console.log("body: ", body);
    const { idDate } = body;

    // console.log("idDAte: ", idDate);
    await schemaId.validateAsync(experienceId);
    await schemaId.validateAsync(idDate);

    const date = await findDatesByIdDate(idDate);
    console.log("create booking - date:", date);
    if (!date) {
      throwJsonError(404, "La fecha no existe");
    }

    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "La experiencia no existe");
    }

    const { eventStartDate, availablePlaces } = date[0];
    console.log("create booking - availablePlaces:", availablePlaces);
    if (availablePlaces === 0) {
      throwJsonError(400, "La experiencia no puede aceptar más participantes");
    }
    const now = new Date();
    if (now > new Date(eventStartDate)) {
      throwJsonError(
        400,
        "No puede hacer una reserva de una experiencia que ya ha comenzado o empezará hoy"
      );
    }

    await updateExperienceWhenBookingIsCreated(idDate);

    const bookingId = await addBookingByExperienceId(id, experienceId, idDate);
    console.log("bookingId OK: ", bookingId);
    res.status(201).send({ bookingId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createBookingByExperienceId;
