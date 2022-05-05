"use strict";

const getPool = require("../infrastructure/database");

async function addBusiness(business) {
  const pool = await getPool();
  const sql = `INSERT INTO business(name, createdAt)
        VALUES(?, ?)
    `;
  const { name } = business;
  const now = new Date();
  const [created] = await pool.query(sql, [name, now]);

  return created.insertId;
}

async function removeBusinessById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM business WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function updateBusiness(id, business) {
  const { name } = business;
  const pool = await getPool();
  const sql = `UPDATE business
        SET name = ?, updatedAt = ? 
        WHERE id = ?
    `;
  const now = new Date();
  await pool.query(sql, [name, now, id]);

  return true;
}

async function findBusinessById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM business WHERE id = ?";
  const [business] = await pool.query(sql, id);

  return business[0];
}

async function findBusinessByName(name) {
  const pool = await getPool();
  const sql = "SELECT * FROM business WHERE name = ?";
  const [business] = await pool.query(sql, name);

  return business;
}

async function findAllBusiness() {
  const pool = await getPool();
  const sql = "SELECT * FROM business";
  const [business] = await pool.query(sql);

  return business;
}

module.exports = {
  addBusiness,
  removeBusinessById,
  updateBusiness,
  findBusinessById,
  findBusinessByName,
  findAllBusiness,
};
