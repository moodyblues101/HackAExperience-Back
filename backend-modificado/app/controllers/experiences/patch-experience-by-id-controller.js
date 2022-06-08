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
  name: Joi.string().min(3).max(120),
  description: Joi.string().min(4).max(400),
  city: Joi.string().min(3).max(30),
  price: Joi.number().positive().max(10000),
  // totalPlaces: Joi.number().integer().positive().max(1000),
  // availablePlaces: Joi.ref("totalPlaces"),
  // eventStartDate: Joi.date().iso(),
  // eventEndDate: Joi.date().iso(),
  idCategory: Joi.number().integer().positive(),
  idBusiness: Joi.number().integer().positive(),
});

async function patchExperienceById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { experienceId } = req.params;
    await schemaId.validateAsync(experienceId);

    const experience = await findExperienceById(experienceId);
    if (!experience) {
      throwJsonError(404, "La experiencia no existe");
    }

    const { body } = req;
    await schemaExperience.validateAsync(body);

    const updatedExperience = {
      ...experience,
      ...body,
    };

    await updateExperience(experienceId, updatedExperience);

    res.status(200).send({ ...updatedExperience });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = patchExperienceById;
