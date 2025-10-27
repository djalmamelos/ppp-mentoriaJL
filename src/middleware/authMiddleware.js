const authService = require('../services/authService');

const authenticate = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'missing_authorization' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid_authorization' });
  const token = parts[1];
  const payload = authService.verify(token);
  if (!payload) return res.status(401).json({ error: 'invalid_token' });
  req.user = payload;
  next();
};

module.exports = { authenticate };
