"use strict";

const express = require('express');
const router = express.Router();
const validateAuth = require("../middleware/validate-auth");
const createCategory = require('../controllers/categories/create-category-controller');
const getCategories = require('../controllers/categories/get-categories-controller');
const getCategoryById = require('../controllers/categories/get-category-by-id-controller');
const deleteCategoryById = require('../controllers/categories/delete-category-by-id-controller');
const patchCategoryById = require('../controllers/categories/patch-category-by-id-controller');
const updateCategoryById = require('../controllers/categories/update-category-by-id-controller');
const getExperiencesByCategoryId = require('../controllers/experiences/get-experiences-by-category-id');

// Endpoints publicos
router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);
router.route('/:categoryId/experiences').get(getExperiencesByCategoryId);
// Endpoints privados
router.route('/').all(validateAuth).post(createCategory);
router.route('/:id').all(validateAuth).delete(deleteCategoryById);
router.route('/:id').all(validateAuth).put(updateCategoryById);
router.route('/:id').all(validateAuth).patch(patchCategoryById);

module.exports = router;