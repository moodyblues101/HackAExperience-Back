"use strict";
const createJsonError = require('../errors/create-json-error');
// Requiere función DB
// Schema Joi

async function nombreFuncion(req, res) {
    try {
        // VALIDACION PARAMETORS ENTRADA 
        // LLAMADA BASE DATOS
        // VALIDAR RESULTADO
        res.send();
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = nombreFuncion;