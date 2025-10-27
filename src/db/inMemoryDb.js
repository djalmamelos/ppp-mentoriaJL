const { v4: uuidv4 } = require('uuid');

const db = {
  users: [],
  prizes: [], // each prize has id, name. units: array of unit objects { id }
  units: [], // individual units referencing prizeId
  draws: [] // recorded draws with metadata
};

// seed admin
const seedAdmin = () => {
  const admin = { id: uuidv4(), username: 'admin', password: 'admin' };
  db.users.push(admin);
};

seedAdmin();

module.exports = db;
