"use strict";

const getPool = require('../infrastructure/database');

async function addReview(idUser, idExperience, comment, rating) {
    const now = new Date();
    const pool = await getPool();
    const sql = `INSERT 
        INTO reviews (idUser, idExperience, comment, rating, createdAt)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [created] = await pool.query(
        sql, [idUser, idExperience, comment, rating, now]
    );

    return created.insertId;
}

async function removeReviewById(id) {
    const pool = await getPool();
    const sql = 'DELETE FROM reviews WHERE id = ?';
    const [review] = await pool.query(sql, id);

    return review;
}

async function findAllReviews() {
    const pool = await getPool();
    const sql = `SELECT reviews.*, users.name, experiences.name, experiences.city, experiences.price
        FROM reviews
        INNER JOIN users ON users.id = reviews.idUser
        INNER JOIN experiences ON experiences.id = idExperience
    `;
    const [reviews] = await pool.query(sql);

    return reviews;
}

async function findReviewById(id) {
    const pool = await getPool();
    const sql = 'SELECT * FROM reviews WHERE id = ?';
    const [review] = await pool.query(sql, id);

    return review[0];
}

async function findReviewsByExperienceId(idExperience) {
    const pool = await getPool();
    const sql = `SELECT * FROM reviews WHERE idExperience = ?`;
    const [review] = await pool.query(sql, idExperience);

    return review;
}

async function findReviewsByUserId(idUser) {
    const pool = await getPool();
    const sql = `SELECT reviews.*, experiences.name, experiences.city, experiences.price
    FROM reviews
    LEFT JOIN experiences ON experiences.id = reviews.idExperience
    WHERE idUser = ?`;
    const [review] = await pool.query(sql, idUser);

    return review;
}

async function getRating(idExperience) {
    const pool = await getPool();
    const sql = `SELECT 
        AVG(rating) as media, 
        COUNT(rating) as numValoraciones 
        FROM reviews WHERE idExperience = ?
    `;
    const [review] = await pool.query(sql, idExperience);

    return review[0];
}

module.exports = {
    addReview,
    removeReviewById,
    findAllReviews,
    findReviewById,
    findReviewsByExperienceId,
    findReviewsByUserId,
    getRating,
}