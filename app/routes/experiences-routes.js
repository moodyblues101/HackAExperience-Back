"use strict";

const express = require("express");
const router = express.Router();
const getExperiences = require("../controllers/experiences/get-experiences-controller");
const getExperienceById = require("../controllers/experiences/get-experience-by-id-controller");
const deleteExperienceById = require("../controllers/experiences/delete-exp-by-id-controller");
const createExperience = require("../controllers/experiences/create-exp-controller");
const updateExperienceById = require("../controllers/experiences/update-experience-by-id-controller");
const validateAuth = require("../middleware/validate-auth");
const getExperiencesBySubcategory = require("../controllers/experiences/get-exp-by-subcat-controller");

router.route("/").get(getExperiences);
router.route("/:id").get(getExperienceById);
router.route("/subcategory/:idSubcategory").get(getExperiencesBySubcategory);

router.route("/").all(validateAuth).post(createExperience);
router.route("/:idExperiences").all(validateAuth).delete(deleteExperienceById);
router.route("/:idExperiences").all(validateAuth).put(updateExperienceById);

module.exports = router;
