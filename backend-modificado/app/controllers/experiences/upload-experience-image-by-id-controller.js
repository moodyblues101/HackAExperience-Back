"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const uploadImage = require("../../helpers/uploadImage");
const { isAdmin } = require("../../helpers/utils");
const {
  addImageByExperienceId,
  removePrincipalByExperienceId,
} = require("../../repositories/experience-images-repository");

const { HTTP_SERVER, PATH_EXPERIENCES_IMAGE } = process.env;

const schemaId = Joi.number().integer().positive().required();
const schemaPrincipal = Joi.boolean();

async function uploadExperienceImageById(req, res) {
  try {
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const { role } = req.auth;
    isAdmin(role);

    const { body } = req;
    const { principal } = body;
    await schemaPrincipal.validateAsync(principal);

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    const { imageExperience } = files;
    if (!imageExperience) {
      throwJsonError(400, "Fichero subido no válido");
    }

    if (!imageExperience.mimetype.startsWith("image")) {
      throwJsonError(400, "Formato no válido");
    }

    const processImage = await uploadImage({
      imageData: imageExperience.data,
      destination: `${PATH_EXPERIENCES_IMAGE}/${experienceId}`,
      width: 300,
      height: 300,
      codImage: experienceId,
    });
    if (principal) {
      await removePrincipalByExperienceId(experienceId);
    }
    await addImageByExperienceId(experienceId, processImage, principal);

    res
      .status(201)
      .send({
        image: `${HTTP_SERVER}/${PATH_EXPERIENCES_IMAGE}/${experienceId}/${processImage}`,
      });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadExperienceImageById;
