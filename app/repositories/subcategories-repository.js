"use strict"

const getPool = require("../infrastructure/database");

async function addSubcategory(subcategory) {
    const pool = await getPool();
    const sql = `INSERT INTO subCategories(name, description, createdAt)
        VALUES(?, ?, ?)
    `;
    const { name, description } = subcategory;
    const now = new Date();
    const [created] = await pool.query(sql, [name, description, now]);

    return created.insertId;
}

async function removeSubcategoryById(id) {
    const pool = await getPool();
    const sql = 'DELETE FROM subCategories WHERE id = ?';
    await pool.query(sql, id);

    return true;
}

async function updateSubcategory(id, subcategory) {
    const { name, description } = subcategory;
    const pool = await getPool();
    const sql = `UPDATE subCategories
        SET name = ?, description = ?, updatedAt = ?
        WHERE id = ?
    `;
    const now = new Date();
    await pool.query(sql, [name, description, now, id]);

    return true;
}

async function findSubcategoryById(id) {
    const pool = await getPool();
    const sql = 'SELECT * FROM subCategories WHERE id = ?';
    const [subcategory] = await pool.query(sql, id);

    return subcategory[0];
}

async function findAllSubcategories() {
    const pool = await getPool();
    const sql = 'SELECT * FROM subCategories ';
    const [subcategory] = await pool.query(sql);

    return subcategory;
}

module.exports = {
    addSubcategory,
    removeSubcategoryById,
    updateSubcategory,
    findSubcategoryById,
    findAllSubcategories,
};