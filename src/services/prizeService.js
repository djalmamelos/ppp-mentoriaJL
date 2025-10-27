const prizeModel = require('../models/prizeModel');
const drawModel = require('../models/drawModel');

const createPrize = (name, quantity) => prizeModel.createPrize(name, quantity);

const listPrizes = () => prizeModel.listPrizesWithTotal();

const getPrize = (id) => prizeModel.findPrizeById(id);

const deleteUnit = (unitId) => prizeModel.deleteUnitById(unitId);

const returnUnitFromDraw = (unit) => {
  // just push back the unit
  const added = prizeModel.addUnitToPrize(unit.prizeId, 1);
  return added && added[0];
};

module.exports = { createPrize, listPrizes, getPrize, deleteUnit, returnUnitFromDraw };
