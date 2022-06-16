"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const uploadImage = require("../../helpers/upload-image");
const { isAdmin } = require("../../helpers/utils");
const {
  addImageByIdExperience,
} = require("../../repositories/image-exp-repository");

const { HTTP_SERVER, PATH_EXPERIENCES_IMAGE } = process.env;

const schema = Joi.number().positive().integer().required();

async function uploadMultipleExperienceImages(req, res) {
  try {
    const { idExperiences } = req.params;
    await schema.validateAsync(idExperiences);
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
          destination: `${PATH_EXPERIENCES_IMAGE}/${idExperiences}`,
          width: 600,
          height: 600,
          codImage: idExperiences,
        });
        await addImageByIdExperience(idExperiences, processImage);
        return {
          image: `${HTTP_SERVER}/${PATH_EXPERIENCES_IMAGE}/${idExperiences}/${processImage}`,
        };
      })
    );
    res.status(201);
    res.send({ data: uploadImages });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadMultipleExperienceImages;
