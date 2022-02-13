"use strict";

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const { isAdmin } = require('../../helpers/utils');
const { addExperience } = require('../../repositories/experiences-repository');

const schemaExperience = Joi.object().keys({
    name: Joi.string().min(3).max(120).required(),
    description: Joi.string().min(4).max(400),
    city: Joi.string().min(3).max(30).required(),
    price: Joi.number().positive().max(10000).required(),
    totalPlaces: Joi.number().integer().positive().max(1000).required(),
    availablePlaces: Joi.ref('totalPlaces'),
    eventStartDate: Joi.date().iso().required(),
    eventEndDate: Joi.date().iso().required(),
    idCategory: Joi.number().integer().positive().required(),
});

async function createExperience(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { body } = req;

        await schemaExperience.validateAsync(body);
        const { idCategory } = body;
        const category = await findCategoryById(idCategory);
        if (!category) {
            throwJsonError(404, `No existe la categoria con id ${idCategory}`);
        }
        const experienceId = await addExperience(body);

        res.status(201).send(
            { message: `Experiencia ${experienceId} creada correctamente` }
        );
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = createExperience;