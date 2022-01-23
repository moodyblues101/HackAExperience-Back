"use strict";

function throwJsonError(status, message) {
    const error = new Error(message);
    error.status = status;

    throw error;
}

module.exports = throwJsonError;