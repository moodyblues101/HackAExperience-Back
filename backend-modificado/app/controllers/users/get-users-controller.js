"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);
        const users = await findAllUsers();
        if (users.length === 0) {
            throwJsonError(404, 'No existen usuarios')
        }
        res.status(200);
        res.send({ usersData: users });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getUsers;