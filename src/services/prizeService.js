const prizeModel = require('../models/prizeModel');
const drawModel = require('../models/drawModel');

const createPrize = (name, quantity) => prizeModel.createPrize(name, quantity);

const listPrizes = () => prizeModel.listPrizesWithTotal();

const getPrize = (id) => prizeModel.findPrizeById(id);

const deleteUnit = (unitId) => prizeModel.deleteUnitById(unitId);

const deletePrize = (prizeId) => prizeModel.deletePrizeById(prizeId);

const updateUnit = (unitId, newPrizeId) => {
  const prize = prizeModel.findPrizeById(newPrizeId);
  if (!prize) return null;
  return prizeModel.updateUnitPrize(unitId, newPrizeId);
};

const returnUnitFromDraw = (unit) => {
  // just push back the unit
  const added = prizeModel.addUnitToPrize(unit.prizeId, 1);
  return added && added[0];
};

module.exports = { createPrize, listPrizes, getPrize, deleteUnit, deletePrize, returnUnitFromDraw };
