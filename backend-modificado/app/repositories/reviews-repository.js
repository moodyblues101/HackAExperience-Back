"use strict";

const getPool = require("../infrastructure/database");

// async function addReview(idUser, idExperience, comment) {
//   const now = new Date();
//   const pool = await getPool();
//   const sql = `INSERT INTO reviews (idUser, idExperience, comment, createdAt)
//         VALUES (?, ?, ?, ?)
//     `;
//   await pool.query(sql, [idUser, idExperience, comment, now]);

//   return true;
// }

async function addReview(idUser, idExperience, comment, rating) {
  const now = new Date();
  const pool = await getPool();
  const sql = `INSERT INTO reviews (idUser, idExperience, comment, rating, createdAt)
        VALUES (?, ?, ?, ?, ?)
    `;
  const [created] = await pool.query(sql, [
    idUser,
    idExperience,
    comment,
    rating,
    now,
  ]);

  return created.insertId;
}

async function removeReviewById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM reviews WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function removeAllReviewsByExperienceId(idExperience) {
  const pool = await getPool();
  const sql = "DELETE FROM reviews WHERE idExperience = ?";
  await pool.query(sql, idExperience);

  return true;
}

async function removeAllReviewsByUserId(idUser) {
  const pool = await getPool();
  const sql = "DELETE FROM reviews WHERE idUser = ?";
  await pool.query(sql, idUser);

  return true;
}

async function findAllReviews() {
  const pool = await getPool();
  const sql = `SELECT 
                reviews.*, 
                users.name as userName, 
                users.profilePic, 
                experiences.name, 
                experiences.city, 
                experiences.price
              FROM reviews
              LEFT JOIN users ON reviews.idUser = users.id
              LEFT JOIN experiences ON reviews.idExperience = experiences.id;
    `;
  const [reviews] = await pool.query(sql);

  return reviews;
}

async function findReviewById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM reviews WHERE id = ?";
  const [review] = await pool.query(sql, id);

  return review[0];
}

async function findReviewsByIdCategory(id) {
  const pool = await getPool();
  const sql = `select reviews.*, users.profilePic, users.name as userName from reviews 
	inner join experiences on experiences.id = reviews.idExperience
    inner join categories on categories.id = experiences.idCategory 
    inner join users on users.id = reviews.idUser
    where categories.id = ?`;

  const [reviews] = await pool.query(sql, id);

  return reviews;
}

async function findReviewsByExperienceId(idExperience) {
  const pool = await getPool();
  const sql = `SELECT reviews.*, users.name as userName, users.profilePic 
                FROM reviews
                left join users on users.id = reviews.idUser
                WHERE idExperience = ?`;
  const [reviews] = await pool.query(sql, idExperience);

  return reviews;
}

async function findReviewsByUserId(idUser) {
  const pool = await getPool();
  const sql = `SELECT reviews.*, experiences.name, experiences.city, experiences.price
    FROM reviews
    LEFT JOIN experiences ON experiences.id = reviews.idExperience
    WHERE idUser = ?`;
  const [reviews] = await pool.query(sql, idUser);

  return reviews;
}

// async function findReviewsByUserId(idUser) {
//   const pool = await getPool();
//   const sql = `SELECT idExperience
//     FROM reviews
//     WHERE idUser = ?`;
//   const [reviews] = await pool.query(sql, idUser);

//   return reviews;
// }

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
  removeAllReviewsByExperienceId,
  removeAllReviewsByUserId,
  findAllReviews,
  findReviewById,
  findReviewsByIdCategory,
  findReviewsByExperienceId,
  findReviewsByUserId,
  getRating,
};
