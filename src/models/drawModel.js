const db = require('../db/inMemoryDb');
const { v4: uuidv4 } = require('uuid');

const createDraw = ({ unitId, prizeId, gender, neighborhood, program, age }) => {
  const draw = { id: uuidv4(), unitId, prizeId, gender, neighborhood, program, age, createdAt: new Date().toISOString() };
  db.draws.push(draw);
  return draw;
};

const listDraws = () => db.draws.slice();

const findDrawById = (id) => db.draws.find(d => d.id === id);

const deleteDrawById = (id) => {
  const idx = db.draws.findIndex(d => d.id === id);
  if (idx === -1) return null;
  const [draw] = db.draws.splice(idx, 1);
  return draw;
};

const updateDrawById = (id, updates = {}) => {
  const draw = db.draws.find(d => d.id === id);
  if (!draw) return null;
  // allowed updates: gender, neighborhood, program, age
  const allowed = ['gender', 'neighborhood', 'program', 'age'];
  allowed.forEach(k => {
    if (updates[k] !== undefined) draw[k] = updates[k];
  });
  return draw;
};

module.exports = { createDraw, listDraws, findDrawById, deleteDrawById, updateDrawById };
