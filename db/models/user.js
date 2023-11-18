// const bcrypt = require('bcrypt');

const {
  Model,
} = require('sequelize');

// const PASSWORD_SALT_ROUNDS = 5;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }

    // async checkPassword(password) {
    //   return bcrypt.compare(password, this.password);
    // }
  }

  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    rut: DataTypes.STRING,
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.beforeSave(async (instance) => {
  //   if (instance.changed('password')) {
  //     const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
  //     instance.set('password', hash);
  //   }
  // });
  return User;
};
