const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON requests


const serviceRoutes = require("./routes/serviceRoutes");


app.use("/", serviceRoutes);

// Start the Express server
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
  });
  
  module.exports = app;
