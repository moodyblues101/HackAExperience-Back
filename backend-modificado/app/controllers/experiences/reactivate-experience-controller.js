"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const {
  findCategoryById,
} = require("../../repositories/categories-repository");
const { findBusinessById } = require("../../repositories/business-repository");
const {
  addExperience,
  findExperienceById,
} = require("../../repositories/experiences-repository");
const {
  addImageByExperienceId,
  findAllImageByExperienceId,
} = require("../../repositories/experience-images-repository");

const schemaId = Joi.number().integer().positive().required();

const schemaExperience = Joi.object().keys({
  name: Joi.string().min(3).max(120).required(),
  description: Joi.string().min(4).max(400),
  city: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().max(10000).required(),
  // totalPlaces: Joi.number().integer().positive().max(1000).required(),
  idCategory: Joi.number().integer().positive().required(),
  idBusiness: Joi.number().integer().positive().required(),
});

async function reactivateExperience(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schemaId.validateAsync(id);
    const experience = await findExperienceById(id);
    if (!experience) {
      throwJsonError(400, "No existe la experiencia a reactivar");
    }

    const { body } = req;
    await schemaExperience.validateAsync(body);

    const { idCategory } = body;
    const category = await findCategoryById(idCategory);
    if (!category) {
      throwJsonError(404, `No existe la categoria con id ${idCategory}`);
    }

    const { idBusiness } = body;
    const business = await findBusinessById(idBusiness);
    if (!business) {
      throwJsonError(404, `No existe la empresa con id ${idBusiness}`);
    }

    const experienceId = await addExperience(body);

    const imgsExp = await findAllImageByExperienceId(id);
    await Promise.all(
      imgsExp.map(
        async (imgExp) =>
          await addImageByExperienceId(experienceId, imgExp.name)
      )
    );

    res.status(201).send({
      message: `Experiencia ${experienceId} creada correctamente`,
      experienceId,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = reactivateExperience;
