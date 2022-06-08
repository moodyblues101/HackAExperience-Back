"use strict";

const getPool = require("../infrastructure/database");

async function findAllExperiences() {
  const pool = await getPool();
  // const sql = "SELECT * FROM experiences";
  const sql = `SELECT 
                experiences.*, 
                business.name as businessName, 
                categories.name as categoryName, 
                reviews.rating
              from experiences
              left join business on experiences.idBusiness = business.id
              left join categories on experiences.idCategory = categories.id
              left join reviews on experiences.id = reviews.idExperience`;

  const [experiences] = await pool.query(sql);

  return experiences;
}

async function findDatesByIdDate(id) {
  const pool = await getPool();
  const sql = `select * from datesExperiences where id = ?`;

  const [datesData] = await pool.query(sql, id);

  return datesData;
}

async function findDatesExperienceById(id) {
  const pool = await getPool();
  const sql = `select * from datesExperiences where idExperience = ?`;

  const [datesExp] = await pool.query(sql, id);

  return datesExp;
}

async function findExperienceById(id) {
  const pool = await getPool();
  const sql = `SELECT 
                  experiences.*, 
                  business.name as businessName, 
                  categories.name as categoryName 
                FROM experiences 
                left join business on experiences.idBusiness = business.id
                left join categories on experiences.idCategory = categories.id
                WHERE experiences.id = ?`;
  const [experience] = await pool.query(sql, id);

  return experience[0];
}

async function findImagesByExperienceId(id) {
  const pool = await getPool();
  const sql = `select * from experienceImages where idExperience = ?`;
  const [imagesExperience] = await pool.query(sql, id);

  return imagesExperience;
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
            name, description, city, price, 
            idCategory, idBusiness, createdAt
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const { name, description, city, price, idCategory, idBusiness } = experience;

  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    description,
    city,
    price,
    idCategory,
    idBusiness,
    now,
  ]);

  return created.insertId;
}

async function addDatesByExperienceId(dateData, idExp) {
  const pool = await getPool();
  const sql = `INSERT INTO datesExperiences (
            eventStartDate, eventEndDate, idExperience, totalPlaces, availablePlaces, createdAt
        ) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const { eventStartDate, eventEndDate, totalPlaces } = dateData;
  const now = new Date();
  const [created] = await pool.query(sql, [
    eventStartDate,
    eventEndDate,
    idExp,
    totalPlaces,
    totalPlaces,
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
  const sql = `UPDATE datesExperiences
        SET availablePlaces = availablePlaces - 1 
        WHERE id = ? AND availablePlaces >= 0
    `;
  await pool.query(sql, id);

  return true;
}

async function updateExperienceWhenBookingIsDeleted(id) {
  const pool = await getPool();
  const sql = `UPDATE datesExperiences
        SET availablePlaces = availablePlaces + 1 
        WHERE id = ? AND availablePlaces >= 0 AND availablePlaces < totalPlaces 
    `;
  await pool.query(sql, id);

  return true;
}

async function updateExperience(id, experience) {
  const { name, description, city, price, idCategory, idBusiness } = experience;
  const pool = await getPool();
  const sql = `UPDATE experiences
        SET name = ?, description = ?, city = ?, price = ?, 
            idCategory = ?, idBusiness = ?, updatedAt = ?
        WHERE id = ?
    `;
  const now = new Date();
  await pool.query(sql, [
    name,
    description,
    city,
    price,
    idCategory,
    idBusiness,
    now,
    id,
  ]);

  return true;
}

async function updateDatesExperienceByDateId(idDate, dates) {
  const { eventStartDate, eventEndDate, totalPlaces, availablePlaces } = dates;
  const pool = await getPool();

  const sql = `UPDATE datesExperiences
                SET eventStartDate = ?, eventEndDate = ?, totalPlaces = ?, 
                availablePlaces = ?, updatedAt = ?
              WHERE id = ?
              `;
  const now = new Date();
  await pool.query(sql, [
    eventStartDate,
    eventEndDate,
    totalPlaces,
    availablePlaces,
    now,
    idDate,
  ]);

  return true;
}

async function findExperiencesByCategoryId(idCategory) {
  const pool = await getPool();
  const sql = `SELECT experiences.*, business.name as businessName, categories.name as categoryName
                FROM experiences 
                left join business on experiences.idBusiness = business.id
                left join categories on experiences.idCategory = categories.id
                WHERE idCategory = ?`;
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
  addDatesByExperienceId,
  addExperience,
  removeExperienceById,
  updateExperience,
  findDatesByIdDate,
  findDatesExperienceById,
  findExperienceById,
  findAllExperiences,
  findExperiencesByCategoryId,
  findImagesByExperienceId,
  updateDatesExperienceByDateId,
  updateExperienceWhenBookingIsCreated,
  updateExperienceWhenBookingIsDeleted,
  updateVisitsWhenExperienceIsFound,
  filterExperiencesByPriceAsc,
  filterExperiencesByPriceDesc,
};
