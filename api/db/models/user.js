const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const Service = require("./service");
const ServiceRequest = require("./serviceRequest");
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rut: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Service, { as: "Service", foreignKey: "supplierId" });
User.hasMany(ServiceRequest, { as: "ServiceRequest", foreignKey: "userId" });

module.exports = User;
