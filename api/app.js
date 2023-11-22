const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors());

// Import and use the app routes
const usersRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { verifyToken } = require('./services/auth');

app.use('/user', usersRoutes);
app.use('/session', sessionRoutes);
app.use('/services', servicesRoutes);
app.use('/serviceRequest', serviceRequestRoutes);
app.use('/message', messageRoutes);
app.use(verifyToken);

module.exports = app;
