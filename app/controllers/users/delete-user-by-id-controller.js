"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { removeUserById, findUserById } = require('../../repositories/users-repository');

const schema = Joi.number().positive().required();

async function deleteUserById(req, res) {
    try {
        const { role } = req.auth;
        isAdmin(role);
        const { id } = req.params;
        await schema.validateAsync(id);
        const user = await findUserById(id);
        if (!user) {
            throwJsonError(400, 'El usuario no existe')
        }

        await removeUserById(id);

        res.status(200).send({ message: `El usuario con id ${id} ha sido borrada correctamente` });
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = deleteUserById;