"use strict";

const getPool = require("../infrastructure/database");

async function addCategory(category) {
    const pool = await getPool();
    const sql = `INSERT INTO categories(name, description, createdAt)
        VALUES(?, ?, ?)
    `;
    const { name, description } = category;
    const now = new Date();
    const [created] = await pool.query(sql, [name, description, now]);

    return created.insertId;
}

async function removeCategoryById(id) {
    const pool = await getPool();
    const sql = 'DELETE FROM categories WHERE id = ?';
    await pool.query(sql, id);

    return true;
}

async function updateCategory(id, category) {
    const { name, description } = category;
    const pool = await getPool();
    const sql = `UPDATE categories
        SET name = ?, description = ?, updatedAt = ?
        WHERE id = ?
    `;
    const now = new Date();
    await pool.query(sql, [name, description, now, id]);

    return true;
}

async function findCategoryById(id) {
    const pool = await getPool();
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const [category] = await pool.query(sql, id);

    return category[0];
}

async function findAllCategories() {
    const pool = await getPool();
    const sql = 'SELECT * FROM categories ';
    const [categories] = await pool.query(sql);

    return categories;
}

module.exports = {
    addCategory,
    removeCategoryById,
    updateCategory,
    findCategoryById,
    findAllCategories,
};