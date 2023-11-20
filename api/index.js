/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const db = require('../db/models/index');

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON requests
app.use(cors());

// Sync the model with the database
db.sequelize
  .sync()
  .then(async () => {
    console.log('Connected to database and synchronized models');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

// Import and use the app routes
const serviceRoutes = require("./routes/serviceRoutes");
const usersRoutes = require("./routes/userRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");

app.use("/user", usersRoutes);
app.use("/", serviceRoutes);
app.use("/services", servicesRoutes);
app.use("/serviceRequest", serviceRequestRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});

module.exports = app;
