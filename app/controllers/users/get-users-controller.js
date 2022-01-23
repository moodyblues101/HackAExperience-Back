"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
    try {
        const { role } = req.auth;
        if (role !== 'administrador') {
            throwJsonError(401, 'No tienes permisos de administrador para realizar esta acción')
        }
        const users = await findAllUsers();

        res.status(200);
        res.send({ usersData: users });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getUsers;