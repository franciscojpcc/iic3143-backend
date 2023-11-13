const User = require("../db/models/user");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log("USER DATA:", userData);
    const user = await User.findOne({ where: { username: userData.username } });
    if (!user) {
      const newUser = await User.create({
        username: userData.username,
        token: userData.token,
      });
      res.status(201).json(newUser);
    } else {
      res.message = "User already exists";
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.getProfile = async (req, res) => {
  const username = req.query.username;
  console.log("USERNAME:", username);
  try {
    const userProfile = await User.findOne({
      where: {
        username: username,
      },
    });
    res.status(200).json({ info: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user information" });
  }
};

exports.updateProfile = async (req, res) => {
  const username = req.query.username;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  console.log("USER NICK:", username);
  try {
    const userProfile = await User.findOne({
      where: {
        username: username,
      },
    });
    if (userProfile) {
      userProfile.username = newUsername;
      userProfile.email = newEmail;
      await userProfile.save();
      res.status(200).json({ info: userProfile });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user information" });
  }
};

exports.deleteProfile = async (req, res) => {
  const username = req.query.username;
  console.log("USER NICK:", username);
  try {
    const userProfile = await User.findOne({
      where: {
        username: username,
      },
    });
    if (userProfile) {
      await userProfile.destroy();
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user information" });
  }
};
