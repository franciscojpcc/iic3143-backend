/* eslint-disable no-console */
const { User } = require('../../db/models');

const checkUserAlreadyExists = async (username) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  return !!user;
};

exports.createUser = async (userData) => {
  try {
    const existingUser = await checkUserAlreadyExists(userData.username);

    if (!existingUser) {
      const newUser = await User.create({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        email: userData.email,
        rut: userData.rut,
        role: userData.role,
        username: userData.username,
        password: userData.password,
      });

      return { success: true, data: newUser };
    }
    console.log('User already exists');
    return {
      success: false,
      statusCode: 409,
      message: 'User already exists',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, statusCode: 500, message: 'Error creating user' };
  }
};

exports.findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error('Error finding user:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error finding user',
      error,
    };
  }
};

exports.updateUserProfile = async (username, newUsername, newEmail) => {
  try {
    const userProfile = await User.findOne({
      where: {
        username,
      },
    });

    if (userProfile) {
      userProfile.username = newUsername;
      userProfile.email = newEmail;
      await userProfile.save();

      return {
        success: true,
        data: userProfile,
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'User not found',
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating user profile',
      error,
    };
  }
};

exports.deleteUserProfile = async (username) => {
  try {
    const userProfile = await User.findOne({
      where: {
        username,
      },
    });

    if (userProfile) {
      await userProfile.destroy();

      return {
        success: true,
        message: 'User deleted',
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'User not found',
    };
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting user profile',
      error,
    };
  }
};
