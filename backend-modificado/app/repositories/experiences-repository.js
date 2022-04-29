"use strict";

const getPool = require("../infrastructure/database");

async function findAllExperiences() {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences";
  const [experiences] = await pool.query(sql);

  return experiences;
}

async function findExperienceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences WHERE id = ?";
  const [experience] = await pool.query(sql, id);

  return experience[0];
}

async function updateVisitsWhenExperienceIsFound(id) {
  const pool = await getPool();
  const sql = `UPDATE experiences
        SET visits = visits + 1 
        WHERE id = ? 
    `;
  await pool.query(sql, id);

  return true;
}

async function addExperience(experience) {
  const pool = await getPool();
  const sql = `INSERT INTO experiences (
            name, description, city, price, totalPlaces, availablePlaces, 
            eventStartDate, eventEndDate, idCategory, idBusiness, createdAt
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const {
    name,
    description,
    city,
    price,
    totalPlaces, //availablePlaces,
    eventStartDate,
    eventEndDate,
    idCategory,
    idBusiness,
  } = experience;
  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    description,
    city,
    price,
    totalPlaces,
    totalPlaces,
    eventStartDate,
    eventEndDate,
    idCategory,
    idBusiness,
    now,
  ]);

  return created.insertId;
}

async function removeExperienceById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM experiences WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function updateExperienceWhenBookingIsCreated(id) {
  const pool = await getPool();
  const sql = `UPDATE experiences
        SET availablePlaces = availablePlaces - 1 
        WHERE id = ? AND availablePlaces >= 0
    `;
  await pool.query(sql, id);

  return true;
}

async function updateExperienceWhenBookingIsDeleted(id) {
  const pool = await getPool();
  const sql = `UPDATE experiences
        SET availablePlaces = availablePlaces + 1 
        WHERE id = ? AND availablePlaces >= 0 AND availablePlaces < totalPlaces 
    `;
  await pool.query(sql, id);

  return true;
}

async function updateExperience(id, experience) {
  const {
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    eventStartDate,
    eventEndDate,
    idCategory,
  } = experience;
  const pool = await getPool();
  const sql = `UPDATE experiences
        SET name = ?, description = ?, city = ?, price = ?, totalPlaces = ?, availablePlaces = ?, 
            eventStartDate = ?, eventEndDate = ?, idCategory = ?, updatedAt = ?
        WHERE id = ?
    `;
  const now = new Date();
  await pool.query(sql, [
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    eventStartDate,
    eventEndDate,
    idCategory,
    now,
    id,
  ]);

  return true;
}

async function findExperiencesByCategoryId(idCategory) {
  const pool = await getPool();
  const sql = `SELECT * FROM experiences WHERE idCategory = ?`;
  const [experiences] = await pool.query(sql, idCategory);

  return experiences;
}

async function filterExperiencesByPriceAsc() {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences ORDER BY price ASC;";
  const [experiences] = await pool.query(sql);

  return experiences;
}

async function filterExperiencesByPriceDesc() {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences ORDER BY price DESC;";
  const [experiences] = await pool.query(sql);

  return experiences;
}

module.exports = {
  addExperience,
  removeExperienceById,
  updateExperience,
  findExperienceById,
  findAllExperiences,
  findExperiencesByCategoryId,
  updateExperienceWhenBookingIsCreated,
  updateExperienceWhenBookingIsDeleted,
  updateVisitsWhenExperienceIsFound,
  filterExperiencesByPriceAsc,
  filterExperiencesByPriceDesc,
};
