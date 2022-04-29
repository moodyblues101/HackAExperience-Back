"use strict";

require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { PORT } = process.env;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

const experiencesRouter = require("./app/routes/experiences-routes");
const usersRouter = require("./app/routes/users-routes");
const bookingsRouter = require("./app/routes/bookings-routes");
const reviewsRouter = require("./app/routes/reviews-routes");
const categoriesRouter = require("./app/routes/categories-routes");
const businessRouter = require("./app/routes/business-routes");

app.use("/api/v1/experiences", experiencesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/business", businessRouter);

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
