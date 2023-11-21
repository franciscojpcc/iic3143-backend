const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.User, {
        foreignKey: 'supplierId',
        as: 'supplier',
        onDelete: 'CASCADE',
      });
      Service.hasMany(models.ServiceRequest, {
        foreignKey: 'serviceId',
      });
    }
  }
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    category: DataTypes.STRING,
    qualification: DataTypes.FLOAT,
    supplierId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
