"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findExperienceById } = require("../../repositories/experiences-repository");

async function getExperienceById(req, res) {
    try {
        const { id } = req.params;
        const experience = await findExperienceById(id);
        if (experience.length === 0) {
            throwJsonError(400, 'Error, parámetro id no válido')
        }

        res.status(200);
        res.send(experience); //res.json(experience);
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getExperienceById;