const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'change-me-please';

const login = ({ username, password }) => {
  const user = userModel.findByUsername(username);
  if (!user) return null;
  // in-memory seeded admin has plain password 'admin'
  if (user.password !== password) return null;

  const token = jwt.sign({ sub: user.id, username: user.username }, SECRET, { expiresIn: '8h' });
  return token;
};

const verify = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { login, verify };
