const authService = require('../services/authService');

const login = (req, res) => {
  const { username, password } = req.body;
  const token = authService.login({ username, password });
  if (!token) return res.status(401).json({ error: 'invalid_credentials' });
  return res.json({ token });
};

module.exports = { login };
