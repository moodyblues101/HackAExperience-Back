"use strict";

const throwJsonError = require("../errors/throw-json-error");

function isAdmin(role) {
    if (role !== 'admin') {
        throwJsonError(403, 'No tienes permisos de admin para realizar esta acción');
    }

    return true
}

module.exports = {
    isAdmin,
}