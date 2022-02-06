'use strict';

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { addBookingByExperienceId } = require('../../repositories/bookings-repository');
const { findExperienceById, updateExperienceWhenBookingIsCreated } = require('../../repositories/experiences-repository');

const schemaId = Joi.number().positive().required();
// const schemaBooking = Joi.object().keys({
//     idUser: Joi.number().integer().positive().required(),
//     idExperience: Joi.number().integer().positive().required(),
// });

async function createBookingByExperienceId(req, res) {
    try {
        const { id } = req.auth
        const { experienceId } = req.params;
        await schemaId.validateAsync(experienceId);
        const experience = findExperienceById(experienceId);
        if (!experience) {
            throwJsonError(404, 'La experiencia no existe');
        }
        // const { body } = req;
        // await schemaBooking.validateAsync(body);

        const bookingId = await addBookingByExperienceId(id, experienceId);
        await updateExperienceWhenBookingIsCreated(experienceId);
        res.status(201).send({ bookingId });

    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = createBookingByExperienceId;