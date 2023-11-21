const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      ServiceRequest.belongsTo(models.Service, {
        foreignKey: 'serviceId',
        as: 'service',
        onDelete: 'CASCADE',
      });
    }
  }
  ServiceRequest.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    state: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ServiceRequest',
  });
  return ServiceRequest;
};
