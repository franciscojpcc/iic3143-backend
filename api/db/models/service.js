const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const User = require("./user");
const ServiceRequest = require("./serviceRequest");

const Service = sequelize.define("Service", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  qualification: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplierId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
});

Service.belongsTo(User, { as: "User", foreignKey: "supplierId" });
Service.hasMany(ServiceRequest, {
  as: "ServiceRequest",
  foreignKey: "serviceId",
});
// Service.hasMany(Review, { foreignKey: "ServiceId" });

module.exports = Service;
