"use strict";

const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/register-user-controller");
const getUsers = require("../controllers/users/get-users-controller");
const getUserProfile = require("../controllers/users/get-user-profile-controller");
const validateUser = require("../controllers/users/activate-user-controller");
const loginUser = require("../controllers/users/login-user-controller");
const validateAuth = require("../middleware/validate-auth");
const deleteUserById = require("../controllers/users/delete-user-by-id-controller");
const uploadImageProfile = require("../controllers/users/upload-image-profile-controller");
const updateUser = require("../controllers/users/update-user-controller");
const getUserReviewsById = require("../controllers/users/get-user-reviews-by-id-controller");
const randomUser = require("../controllers/users/random-user-controller");
const getBookingsByUserId = require("../controllers/bookings/get-bookings-by-user-id-controller");
const patchUserNameById = require("../controllers/users/patch-user-name-by-id-controller");
const patchUserBioById = require("../controllers/users/patch-user-bio-by-id-controller");
const patchUserPasswordById = require("../controllers/users/patch-user-password-by-id-controller");

// Endpoint Públicos
router.route("/").post(registerUser);
router.route("/activation").get(validateUser);
router.route("/login").post(loginUser);
router.route("/:id/reviews").get(getUserReviewsById);
router.route("/random").get(randomUser);

// Endpoint Privados
router.route("/").all(validateAuth).get(getUsers);
router.route("/").all(validateAuth).put(updateUser);
// router.route("/avatar").all(validateAuth).patch(patchUserAvatarById);
router.route("/name").all(validateAuth).patch(patchUserNameById);
router.route("/bio").all(validateAuth).patch(patchUserBioById);
router.route("/password").all(validateAuth).patch(patchUserPasswordById);
router.route("/profile").all(validateAuth).get(getUserProfile);
router.route("/:id").all(validateAuth).delete(deleteUserById);
router.route("/upload").all(validateAuth).post(uploadImageProfile);
router.route("/:userId/bookings").all(validateAuth).get(getBookingsByUserId);
// PUT api/v1/users/:id/avatar

module.exports = router;
