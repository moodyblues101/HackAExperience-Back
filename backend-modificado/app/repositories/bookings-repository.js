"use strict";

const getPool = require("../infrastructure/database");

async function addBookingByExperienceId(idUser, idExperience) {
  const now = new Date();
  const pool = await getPool();
  const sql = `INSERT INTO bookings (idUser, idExperience, createdAt)
        VALUES (?, ?, ?)
    `;
  const [created] = await pool.query(sql, [idUser, idExperience, now]);

  return created.insertId;
}

async function removeBookingById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM bookings WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function removeAllBookingsByExperienceId(idExperience) {
  const pool = await getPool();
  const sql = "DELETE FROM bookings WHERE idExperience = ?";
  await pool.query(sql, idExperience);

  return true;
}

async function removeAllBookingsByUserId(idUser) {
  const pool = await getPool();
  const sql = "DELETE FROM bookings WHERE idUser = ?";
  await pool.query(sql, idUser);

  return true;
}

async function findAllBookings() {
  const pool = await getPool();
  const sql = `SELECT bookings.*, experiences.name, experiences.city, experiences.price
        FROM bookings
        INNER JOIN users ON users.id = bookings.idUser
        INNER JOIN experiences ON experiences.id = idExperience
    `;
  const [bookings] = await pool.query(sql);

  return bookings;
}

async function findBookingById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM bookings WHERE id = ?";
  const [booking] = await pool.query(sql, id);

  return booking[0];
}

async function findBookingsByExperienceId(idExperience) {
  const pool = await getPool();
  const sql = `SELECT bookings.*, users.profilePic, users.bio, user.name 
                FROM bookings 
                left join users on users.id = bookings.idUser
                WHERE idExperience = ?`;
  const [booking] = await pool.query(sql, idExperience);

  return booking;
}

async function findBookingsByUserId(idUser) {
  const pool = await getPool();
  const sql = `SELECT 
        bookings.*, 
        experiences.name, 
        experiences.description, 
         experiences.city, 
        experiences.price, 
        experiences.eventStartDate
    FROM bookings
    LEFT JOIN experiences ON experiences.id = bookings.idExperience   
    WHERE idUser = ?`;
  const [booking] = await pool.query(sql, idUser);

  return booking;
}

module.exports = {
  addBookingByExperienceId,
  removeBookingById,
  removeAllBookingsByExperienceId,
  removeAllBookingsByUserId,
  findAllBookings,
  findBookingById,
  findBookingsByExperienceId,
  findBookingsByUserId,
};
