"use strict";

const createJsonError = require("../../errors/create-json-error");
const { getRandomUser } = require("../../repositories/api-repository");

async function randomUser(req, res) {
    try {
        const randomUser = await getRandomUser();
        const [user] = randomUser.data.results;
        const { name, login, picture } = user;
        const { first, last } = name;
        const { username, password } = login;
        const { large } = picture;
        const email = user.email;

        res.status(200);
        res.send({
            name: `${first} ${last}`,
            username,
            password,
            email,
            photo: large,
        });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = randomUser;