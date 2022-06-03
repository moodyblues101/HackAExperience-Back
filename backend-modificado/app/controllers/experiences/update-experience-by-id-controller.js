"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findExperienceById,
  updateExperience,
} = require("../../repositories/experiences-repository");

const schemaId = Joi.number().integer().positive().required();
const schemaExperience = Joi.object().keys({
  name: Joi.string().min(3).max(120).required(),
  description: Joi.string().min(4).max(400),
  city: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().max(10000).required(),
  // totalPlaces: Joi.number().integer().positive().max(1000).required(),
  // availablePlaces: Joi.ref('totalPlaces'),
  // eventStartDate: Joi.date().iso().required(),
  // eventEndDate: Joi.date().iso().required(),
  idCategory: Joi.number().integer().positive().required(),
});

async function updateExperienceById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);
    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "No existe la experiencia");
    }
    const { body } = req;
    await schemaExperience.validateAsync(body);

    await updateExperience(experienceId, body);
    const { name } = body;
    res
      .status(200)
      .send({
        message: `La experiencia con nombre ${name} ha sido actualizada correctamente`,
      });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateExperienceById;
