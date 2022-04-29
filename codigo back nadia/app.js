"use strict";

require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;

app.use(express.json());

const experiencesRouter = require('./app/routes/experiences-routes');
const usersRouter = require('./app/routes/users-routes');
const bookingsRouter = require('./app/routes/bookings-routes');


app.use('/api/v1/experiences', experiencesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/bookings', bookingsRouter);


app.listen(PORT, () => console.log(`Running on port: ${PORT}`));


// TODO: 
// USERS-LOGIN
// 1.LOGIN
// 2.REGISTER
// 3.UPLOAD IMAGE
// 4.EDIT PROFILE
// 5.GET PASSWORD
// 6.VALIDATE USER
// 7.GET USERS BY ID
// 8.DELETE USERS BY ID
// 9. GET USERS PROFILE
// RESERVAS
// 1.CREATE
// 2.CANCELAR
// 3.ENVIAR CORREO DESPUÉS DE LA EXPERIENCIA