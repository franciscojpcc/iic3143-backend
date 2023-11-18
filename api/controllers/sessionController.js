const { generateToken } = require('../services/auth');
const { User } = require('../../db/models');

// endpoint para crear la sesión, login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(password);
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user) {
    // const authenticated = user.checkPassword(password);

    // if (authenticated) {
    try {
      const token = await generateToken(user);
      const body = {
        access_token: token,
        token_type: 'Bearer',
      };
      res.status(200).send(body);
    } catch (err) {
      res.status(500).json({ message: 'Error creating token' });
    }
  } else {
    const error = user ? 'Wrong password' : 'The username is not registered';
    res.status(401).json({ message: error });
  }
};
//   } else {
//     res.status(401).json({ message: 'The username is not registered' });
//   }

// endpoint para cerrar la sesión, logout
exports.logout = async (req, res) => {
  res.status(200).send({ message: 'Logout successful' });
};
