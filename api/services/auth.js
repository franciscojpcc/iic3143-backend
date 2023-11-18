const jwtgenerator = require('jsonwebtoken');

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { sub: user.id, name: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

// function to verify token
const verifyToken = (req, res, next) => {
  const token2 = req.headers.authorization;
  // sacar bearer a token
  const token = token2.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwtgenerator.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Agregar la información del usuario decodificado a la solicitud
    req.user = decoded;
    next();
    return true;
  });
  return true;
};

module.exports = { generateToken, verifyToken };
