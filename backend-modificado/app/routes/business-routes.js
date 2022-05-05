"use strict";

const express = require("express");
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");
const getBusiness = require("../controllers/business/get-business-controller");
const getBusinessById = require("../controllers/business/get-business-by-id-controller");
const createBusiness = require("../controllers/business/create-business-controller");
const getBusinessByName = require("../controllers/business/get-business-by-name-controller");
const deleteBusinessById = require("../controllers/business/delete-business-by-id-controller");
const updateBusinessById = require("../controllers/business/update-business-by-id-controller");
const patchBusinessById = require("../controllers/business/patch-business-by-id-controller");
const getExperiencesByBusinessId = require("../controllers/experiences/get-experiences-by-business-id-controller");

// Endpoints publicos
router.route("/").get(getBusiness);
router.route("/:id").get(getBusinessById);
router.route("/:categoryId/experiences").get(getExperiencesByBusinessId);
// Endpoints privados
router.route("/").all(validateAuth).post(createBusiness);
router.route("/name/:name").all(validateAuth).get(getBusinessByName);
router.route("/:id").all(validateAuth).delete(deleteBusinessById);
router.route("/:id").all(validateAuth).put(updateBusinessById);
router.route("/:id").all(validateAuth).patch(patchBusinessById);

module.exports = router;
