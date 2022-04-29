"use strict";
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findExperiencesBySubcategory,
} = require("../../repositories/experiences-repository");

async function getExperiencesBySubcategory(req, res) {
  try {
    const { idSubcategory } = req.params;
    const experience = await findExperiencesBySubcategory(idSubcategory);
    if (experience.length === 0) {
      throwJsonError(400, "Parametro no valido");
    }
    res.status(200);
    res.send(experience);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getExperiencesBySubcategory;
