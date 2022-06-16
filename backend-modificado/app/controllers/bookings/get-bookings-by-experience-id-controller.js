"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
// const { isAdmin } = require("../../helpers/utils");
const {
  findBookingsByExperienceId,
} = require("../../repositories/bookings-repository");
const {
  findExperienceById,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();

async function getBookingsByExperienceId(req, res) {
  try {
    // const { role } = req.auth;
    // isAdmin(role);

    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);

    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "La experiencia no existe");
    }

    const bookings = await findBookingsByExperienceId(experienceId);
    if (bookings.length === 0) {
      throwJsonError(
        404,
        `No existen reservas para la experiencia con id ${experienceId}`
      );
    }
    res.status(200).send(bookings);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBookingsByExperienceId;
