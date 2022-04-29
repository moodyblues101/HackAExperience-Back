"use strict";

const getPool = require("../infrastructure/database");

async function addExperience(experience) {
  const pool = await getPool();
  const now = new Date();
  const consulta = `INSERT INTO experiences (
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    eventStartDate,
    eventEndDate,
    createdAt,
    idCategories
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const {
    name,
    description,
    city,
    price,
    totalPlaces,
    eventStartDate,
    eventEndDate,
    idCategories,
  } = experience;

  const [created] = await pool.query(consulta, [
    name,
    description,
    city,
    price,
    totalPlaces,
    totalPlaces,
    eventStartDate,
    eventEndDate,
    now,
    idCategories,
  ]);

  return created.insertId;
}

async function findAllExperiences() {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences";
  const [experiences] = await pool.query(sql);

  return experiences;
}

async function findExperienceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM experiences WHERE idExperiences = ?";
  const [experience] = await pool.query(sql, id);

  return experience;
}

async function findExperiencesBySubcategory(idSubcategories) {
  const pool = await getPool();
  const sql = ` 
      select * from experiences 
      inner join subCategories 
      on experiences.idExperiences = subCategories.idExperiences 
      where subCategories.idSubcategories = ?`;
  const [experiences] = await pool.query(sql, idSubcategories);

  return experiences[0];
}

async function updateExperience(idExperiences, experience) {
  const {
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    eventStartDate,
    eventEndDate,
    idCategories,
  } = experience;

  const now = new Date();
  const pool = await getPool();
  const sql = `UPDATE experiences 
  SET name = ?,
  description = ?,
  city = ?,
  price = ?,
  totalPlaces = ?,
  availablePlaces = ?,
  eventStartDate = ?,
  eventEndDate = ?,
  updatedAt = ?,
  idCategories = ?
  WHERE idExperiences = ?`;
  const [result] = await pool.query(sql, [
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    eventStartDate,
    eventEndDate,
    now,
    idCategories,
    idExperiences,
  ]);

  return result.affectedRows === 1;
}

async function removeExperienceById(idExperiences) {
  const pool = await getPool();
  const sql = "DELETE FROM experiences WHERE idExperiences = ?";
  await pool.query(sql, idExperiences);

  return true;
}

module.exports = {
  addExperience,
  findAllExperiences,
  findExperienceById,
  findExperiencesBySubcategory,
  removeExperienceById,
  updateExperience,
};
