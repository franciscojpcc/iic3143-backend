const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const User = require("./user");
const Service = require("./service");

const ServiceRequest = sequelize.define("ServiceRequest", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Service",
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ServiceRequest.belongsTo(User, { as: "User", foreignKey: "userId" });


ServiceRequest.belongsTo(Service, { as: "Service", foreignKey: "serviceId" });

module.exports = ServiceRequest;
