"use strict";

const createJsonError = require("../../errors/create-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);
        const users = await findAllUsers();

        res.status(200);
        res.send({ usersData: users });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getUsers;