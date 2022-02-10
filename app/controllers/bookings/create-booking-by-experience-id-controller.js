'use strict';

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { addBookingByExperienceId } = require('../../repositories/bookings-repository');
const { findExperienceById, updateExperienceWhenBookingIsCreated } = require('../../repositories/experiences-repository');

const schemaId = Joi.number().positive().required();

async function createBookingByExperienceId(req, res) {
    try {
        const { id } = req.auth
        const { experienceId } = req.params;
        await schemaId.validateAsync(experienceId);
        const experience = await findExperienceById(experienceId);
        if (!experience) {
            throwJsonError(404, 'La experiencia no existe');
        }
        const { availablePlaces, eventStartDate } = experience;
        if (availablePlaces === 0) {
            throwJsonError(400, 'La experiencia no puede aceptar mas participantes');
        }
        const now = new Date();
        if (now.getTime() > eventStartDate.getTime()) {
            throwJsonError(400, 'No puede hacer una reserva de una experiencia que ya ha comenzado o empezara hoy')
        }
        await updateExperienceWhenBookingIsCreated(experienceId);
        const bookingId = await addBookingByExperienceId(id, experienceId);
        res.status(201).send({ bookingId });

    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = createBookingByExperienceId;