/* eslint-disable no-console */
const db = require('../db/models/index');
const app = require('./app');

const PORT = 3000;

// Sync the model with the database
db.sequelize
  .sync()
  .then(async () => {
    console.log('Connected to database and synchronized models');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

// Start the Express server
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
