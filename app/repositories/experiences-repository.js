"use strict";

const getPool = require('../infrastructure/database');

async function findAllExperiences() {
    const pool = await getPool();
    const sql = 'SELECT * FROM experiences';
    const [experiences] = await pool.query(sql);

    return experiences;
}

async function findExperienceById(id) {
    const pool = await getPool();
    const sql = 'SELECT * FROM experiences WHERE idExperiences = ?';
    const [experience] = await pool.query(sql, id);

    return experience;
}

module.exports = {
    findAllExperiences,
    findExperienceById,
}