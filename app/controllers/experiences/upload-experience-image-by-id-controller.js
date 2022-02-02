"use strict";

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require('../../errors/throw-json-error');
const uploadImage = require('../../helpers/uploadImage');
const { isAdmin } = require('../../helpers/utils');
const { addImageByExperienceId } = require('../../repositories/experiences-repository');

const schema = Joi.number().integer().positive().required();

async function uploadExperienceImageById(req, res) {
    try {
        const { experienceId } = req.params
        await schema.validateAsync(experienceId);
        const { role } = req.auth;
        isAdmin(role);

        const { files } = req;
        if (!files || Object.keys(files).length === 0) {
            throwJsonError(400, 'No se ha seleccionado ningún fichero');
        }
        const { imageExperience } = files;
        if (!imageExperience) {
            throwJsonError(400, 'Fichero subido no válido');
        }

        if (!imageExperience.mimetype.startsWith('image')) {
            throwJsonError(400, 'Formato no válido');
        }
        const { PATH_EXPERIENCE_IMAGE } = process.env;
        const processImage = await uploadImage({
            imageData: imageExperience.data,
            destination: `${PATH_EXPERIENCE_IMAGE}/${experienceId}`,
            width: 300,
            height: 300,
            codImage: experienceId,
        });
        await addImageByExperienceId(experienceId, processImage);

        res.status(201).send({ image: processImage });

    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = uploadExperienceImageById;