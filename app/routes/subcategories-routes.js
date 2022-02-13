"use strict";

const express = require('express');
const router = express.Router();
const validateAuth = require('../middleware/validate-auth');
const createSubcategory = require('../controllers/subcategories/create-subcategory-controller');
const deleteSubcategoryById = require('../controllers/subcategories/delete-subcategory-by-id-controller');
const getSubcategories = require('../controllers/subcategories/get-subcategories-controller');
const getSubcategoryById = require('../controllers/subcategories/get-subcategory-by-id-controller');
const updateSubcategoryById = require('../controllers/subcategories/update-subcategory-by-id-controller');

// Endpoints publicos
router.route('/').get(getSubcategories);
router.route('/:id').get(getSubcategoryById);
// Endpoints privados
router.route('/').all(validateAuth).post(createSubcategory);
router.route('/:id').all(validateAuth).delete(deleteSubcategoryById);
router.route('/:id').all(validateAuth).put(updateSubcategoryById);
router.route('/:id').all(validateAuth).patch(updateSubcategoryById);


module.exports = router;