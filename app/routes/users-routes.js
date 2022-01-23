"use strict";

const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/users/register-user-controller')
const getUsers = require('../controllers/users/get-users-controller');
const getUserProfile = require('../controllers/users/get-user-profile-controller');
const validateUser = require('../controllers/users/activate-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const validateAuth = require('../middleware/validate-auth');

// Endpoint Públicos
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

// Endpoint Privados
// router.route('/').get(getUsers);
router.route('/').all(validateAuth).get(getUsers);
router.route('/profile').all(validateAuth).get(getUserProfile);
// GET api/v1/users/:id <== solo propietario
// PUT api/v1/users/:id
// PUT api/v1/users/:id/avatar
// DELETE api/v1/users/:id

module.exports = router;