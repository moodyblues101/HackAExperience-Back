"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findAllExperiences,
} = require("../../repositories/experiences-repository");

async function getExperiences(req, res) {
  try {
    const experiences = await findAllExperiences();
    if (experiences.length === 0) {
      throwJsonError(404, "No existen experiencias");
    }
    res.status(200);
    res.send(experiences);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getExperiences;
