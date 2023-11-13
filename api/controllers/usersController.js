const User = require("../db/models/user");
const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      console.log("User already exists");
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.getProfile = async (req, res) => {
  const username = req.query.username;
  try {
    const result = await userService.findUserByUsername(username);

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error("Error getting user information:", result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

exports.updateProfile = async (req, res) => {
  const username = req.query.username;
  const newUsername = req.body.username;
  const newEmail = req.body.email;

  try {
    const result = await userService.updateUserProfile(
      username,
      newUsername,
      newEmail
    );

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

exports.deleteProfile = async (req, res) => {
  const username = req.query.username;

  try {
    const result = await userService.deleteUserProfile(username);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

