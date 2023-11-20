const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors());

// Import and use the app routes
const serviceRoutes = require('./routes/serviceRoutes');
const usersRoutes = require('./routes/userRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');

app.use('/user', usersRoutes);
app.use('/', serviceRoutes);
app.use('/services', servicesRoutes);
app.use('/serviceRequest', serviceRequestRoutes);

module.exports = app;
