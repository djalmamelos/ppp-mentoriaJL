const db = require('../db/inMemoryDb');
const { v4: uuidv4 } = require('uuid');

const createPrize = (name, quantity) => {
  const prize = { id: uuidv4(), name };
  db.prizes.push(prize);
  // create units
  for (let i = 0; i < quantity; i++) {
    const unit = { id: uuidv4(), prizeId: prize.id };
    db.units.push(unit);
  }
  return prize;
};

const listPrizesWithTotal = () => {
  return db.prizes.map(p => {
    const total = db.units.filter(u => u.prizeId === p.id).length;
    return { ...p, total };
  });
};

const findPrizeById = (id) => db.prizes.find(p => p.id === id);

const findUnitById = (unitId) => db.units.find(u => u.id === unitId);

const deleteUnitById = (unitId) => {
  const idx = db.units.findIndex(u => u.id === unitId);
  if (idx === -1) return null;
  const [unit] = db.units.splice(idx, 1);
  return unit;
};

const addUnitToPrize = (prizeId, count = 1) => {
  const prize = findPrizeById(prizeId);
  if (!prize) return null;
  const added = [];
  for (let i = 0; i < count; i++) {
    const unit = { id: uuidv4(), prizeId };
    db.units.push(unit);
    added.push(unit);
  }
  return added;
};

const deletePrizeById = (prizeId) => {
  const prizeIdx = db.prizes.findIndex(p => p.id === prizeId);
  if (prizeIdx === -1) return null;
  // only allow delete if no units exist for this prize
  const unitsCount = db.units.filter(u => u.prizeId === prizeId).length;
  if (unitsCount > 0) return { error: 'prize_has_units' };
  const [prize] = db.prizes.splice(prizeIdx, 1);
  return prize;
};

module.exports = {
  createPrize,
  listPrizesWithTotal,
  findPrizeById,
  findUnitById,
  deleteUnitById,
  addUnitToPrize
  ,deletePrizeById
};
