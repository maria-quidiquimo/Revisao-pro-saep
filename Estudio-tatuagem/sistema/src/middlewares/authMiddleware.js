const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não informado.' });
  }

  try {
    req.usuario = jwt.verify(
      authorization.slice(7),
      process.env.JWT_SECRET
    );
    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
};
