"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const uploadImage = require("../../helpers/uploadImage");
const { isAdmin } = require("../../helpers/utils");
const {
  addImageByExperienceId,
} = require("../../repositories/experience-images-repository");

const { HTTP_SERVER, PATH_EXPERIENCES_IMAGE } = process.env;

const schemaId = Joi.number().integer().positive().required();

async function uploadMultipleExperienceImages(req, res) {
  try {
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const { role } = req.auth;
    isAdmin(role);
    const { files } = req;

    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }

    const { imageExperience } = files;

    const uploadImages = await Promise.all(
      imageExperience.map(async (imgExperience) => {
        const { data } = imgExperience;
        const processImage = await uploadImage({
          imageData: data,
          destination: `${PATH_EXPERIENCES_IMAGE}/${experienceId}`,
          width: 600,
          height: 600,
          // codImage: experienceId,
        });
        await addImageByExperienceId(experienceId, processImage);

        return {
          image: `${HTTP_SERVER}/${PATH_EXPERIENCES_IMAGE}/${experienceId}/${processImage}`,
        };
      })
    );

    res.status(201).send({ imageData: uploadImages });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadMultipleExperienceImages;
