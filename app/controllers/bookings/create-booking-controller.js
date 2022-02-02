'use strict';

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");

// const schemaBooking = Joi.object().keys({
//     idUser: Joi.number().integer().positive().required(),
//     idExperience: Joi.number().integer().positive().required(),
// });

// async function createBooking(req, res) {
//     try {
//         const { id } = req.auth;

//     } catch (error) {

//     }
// }

