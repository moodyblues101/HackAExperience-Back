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
    const sql = 'SELECT * FROM experiences WHERE id = ?';
    const [experience] = await pool.query(sql, id);

    return experience[0];
}

async function addExperience(experience) {

    const pool = await getPool();
    const sql = `
            INSERT INTO experiences(
                name, description, city, price, totalPlaces, 
                eventStartDate, eventEndDate, idCategory, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const { name, description, city, price, totalPlaces,
        eventStartDate, eventEndDate, idCategory } = experience;
    const now = new Date();
    const [created] = await pool.query(sql, [
        name, description, city, price, totalPlaces,
        eventStartDate, eventEndDate, idCategory, now
    ]);

    return created.insertId;
}

async function removeExperienceById(id) {
    const pool = await getPool();
    const sql = 'DELETE FROM experiences WHERE id = ?';
    await pool.query(sql, id);

    return true;
}

async function addImageByExperienceId(idExperience, imageExperience) {
    const pool = await getPool();
    const now = new Date();
    const sql = `INSERT INTO experienceImages(
        name,
        principal,
        idExperience,
        createdAt
    ) VALUES (?, ?, ?, ?)`;
    const [experiences] = await pool.query(sql, [imageExperience, false, idExperience, now]);

    return true;
}

async function updateExperience(id, experience) {
    const { name, description, city, price, totalPlaces,
        eventStartDate, eventEndDate, idCategory } = experience;
    const now = new Date();
    const pool = await getPool();
    const sql = `
        UPDATE experiences
        SET name = ?, description = ?, city = ?, price = ?, totalPlaces = ?, 
        eventStartDate = ?, eventEndDate = ?, idCategory = ?, updatedAt = ?
        WHERE id = ?
    `;
    await pool.query(sql, [name, description, city, price, totalPlaces,
        eventStartDate, eventEndDate, idCategory, now, id]);
    // await pool.query(sql, [
    //     ...Object.values(experience),
    //     now,
    //     id,
    // ]);
    // !delete    
    return true;
}

module.exports = {
    findAllExperiences,
    findExperienceById,
    addExperience,
    removeExperienceById,
    addImageByExperienceId,
    updateExperience,
    //findExperienceByCategory**
}