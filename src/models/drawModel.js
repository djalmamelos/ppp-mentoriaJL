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

module.exports = { createDraw, listDraws, findDrawById, deleteDrawById };
