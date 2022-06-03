"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findBookingById,
  removeBookingById,
} = require("../../repositories/bookings-repository");
const {
  updateExperienceWhenBookingIsDeleted,
  findExperienceById,
  findDatesExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function deleteBookingById(req, res) {
  try {
    const { id } = req.params;
    await schemaId.validateAsync(id);

    const booking = await findBookingById(id);
    if (!booking) {
      throwJsonError(400, "Esta reserva no existe");
    }

    const { idExperience, idDate } = booking;

    // const experience = await findExperienceById(idExperience);
    const dates = await findDatesExperienceById(idDate);

    const { eventStartDate } = dates;
    // if (availablePlaces === totalPlaces) {
    //     throwJsonError(400, 'No se puede eliminar esta reserva. La experiencia asociada a la reserva podría tener un overbooking.');
    // }

    const now = new Date();
    if (now.getTime() > new Date(eventStartDate).getTime()) {
      throwJsonError(
        400,
        "No puede eliminar una reserva de una experiencia que ya ha comenzado o comenzara hoy"
      );
    }

    await updateExperienceWhenBookingIsDeleted(idDate);

    await removeBookingById(id);

    res.status(200);
    res.send({
      message: `La reserva con id ${id} ha sido borrada correctamente`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteBookingById;
