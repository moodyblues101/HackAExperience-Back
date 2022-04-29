"use strict"

const getPool = require("../infrastructure/database");

async function addImageByExperienceId(idExperience, filename, principal = false) {
    const pool = await getPool();
    const now = new Date();
    const sql = `INSERT INTO experienceImages(
        name,
        principal,
        idExperience,
        createdAt
    ) VALUES (?, ?, ?, ?)`;
    const [experiences] = await pool.query(sql, [filename, principal ? true : false, idExperience, now]);

    return true;
}

async function findAllImageByExperienceId(idExperience) {
    const pool = await getPool();
    const sql = `SELECT name, principal
        FROM experienceImages
        WHERE idExperience = ?
        ORDER BY principal DESC
    `;
    const [experiences] = await pool.query(sql, idExperience);

    return experiences;
}

async function removePrincipalByExperienceId(idExperience) {
    const pool = await getPool();
    const sql = `UPDATE experienceImages
        SET principal = false
        WHERE idExperience = ?
    `;
    const [result] = await pool.query(sql, idExperience);

    return (result.affectedRows === 1);
}

module.exports = {
    addImageByExperienceId,
    findAllImageByExperienceId,
    removePrincipalByExperienceId,

}