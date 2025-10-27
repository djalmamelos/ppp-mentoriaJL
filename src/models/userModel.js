const db = require('../db/inMemoryDb');

const findByUsername = (username) => db.users.find(u => u.username === username);

const createUser = (user) => {
  db.users.push(user);
  return user;
};

module.exports = { findByUsername, createUser };
