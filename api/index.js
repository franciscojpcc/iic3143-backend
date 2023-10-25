const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON requests

const serviceRoutes = require('./routes/serviceRoutes.js');

app.use('/', serviceRoutes);

// Start the Express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server  is running on port ${PORT}`);
});

module.exports = app;
