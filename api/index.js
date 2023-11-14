/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const populateUsers = require('./seeds/userSeeds');

const sequelize = require('./db/index');

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON requests
app.use(cors());

// Sync the model with the database
sequelize
  .sync()
  .then(async () => {
    console.log('Connected to database and synchronized models');

    // Populate users
    await populateUsers.up(sequelize.getQueryInterface(), sequelize.constructor);
    console.log('Users populated successfully');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

// Import and use the app routes
const serviceRoutes = require('./routes/serviceRoutes');
const usersRoutes = require('./routes/userRoutes');

app.use('/user', usersRoutes);
app.use('/', serviceRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});

module.exports = app;
