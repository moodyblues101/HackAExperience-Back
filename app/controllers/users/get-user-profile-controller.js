"use strict";

const createJsonError = require('../../errors/create-json-error');
const { findUserById } = require('../../repositories/users-repository');

const { HTTP_SERVER, PATH_USER_IMAGE } = process.env;

async function getUserProfile(req, res) {
    try {
        const { id } = req.auth;
        const user = await findUserById(id);
        const { name, email, bio, role, createdAt } = user;
        const image = `${HTTP_SERVER}/${PATH_USER_IMAGE}/${user.profilePic}`;

        res.status(200).send({ name, email, bio, role, createdAt, image });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = getUserProfile; //getUserById