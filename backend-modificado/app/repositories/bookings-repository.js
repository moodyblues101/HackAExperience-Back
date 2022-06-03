"use strict";

const getPool = require("../infrastructure/database");

async function addBookingByExperienceId(idUser, idExperience, idDate) {
  const now = new Date();
  const pool = await getPool();
  const sql = `INSERT INTO bookings (idUser, idExperience, idDate, createdAt)
        VALUES (?, ?, ?, ?)
    `;
  const [created] = await pool.query(sql, [idUser, idExperience, idDate, now]);

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

async function findBookingByIdDate(id) {
  const pool = await getPool();
  const sql = `select bookings.*, users.profilePic, users.bio, users.name 
              from bookings 
              left join users on users.id = bookings.idUser
              where idDate = ?`;
  const [bookings] = await pool.query(sql, id);

  return bookings;
}

async function findBookingsByExperienceId(idExperience) {
  const pool = await getPool();
  const sql = `SELECT bookings.*, users.profilePic, users.bio, users.name 
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
        datesExperiences.eventStartDate
    FROM bookings
    LEFT JOIN experiences ON experiences.id = bookings.idExperience  
    left join datesExperiences on datesExperiences.id = bookings.idDate 
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
  findBookingByIdDate,
  findBookingsByExperienceId,
  findBookingsByUserId,
};
