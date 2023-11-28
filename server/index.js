const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path')
// Env
dotenv.config();

// Mongoose
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(express.static(path.join(__dirname,"public")))

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Access"],
  })
);

// Routers
const Admin = require("./Router/admin");
app.use("/", Admin);

// Set port
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
