const { Sequelize } = require("sequelize");

// access the environment variables
const db = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(db, user, password, {
  host: "db",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;
