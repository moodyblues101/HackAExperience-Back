"use strict";

const throwJsonError = require("../errors/throw-json-error");

function isAdmin(role) {
  if (role !== "administrador") {
    throwJsonError(
      403,
      "No tienes permisos de administrador para realizar esta acción"
    );
  }

  return true;
}

module.exports = {
  isAdmin,
};
