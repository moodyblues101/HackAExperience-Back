"use strict";

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(fileUpload());

const experiencesRouter = require('./app/routes/experiences-routes');
const usersRouter = require('./app/routes/users-routes');
const bookingsRouter = require('./app/routes/bookings-routes');
const reviewsRouter = require('./app/routes/reviews-routes');
const categoriesRouter = require('./app/routes/categories-routes');


app.use('/api/v1/experiences', experiencesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/categories', categoriesRouter);


app.listen(PORT, () => console.log(`Running on port: ${PORT}`));