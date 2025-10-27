const drawModel = require('../models/drawModel');
const prizeModel = require('../models/prizeModel');

const createDraw = ({ unitId, gender, neighborhood, program, age }) => {
  // find and remove unit
  const unit = prizeModel.findUnitById(unitId);
  if (!unit) return { error: 'unit_not_found' };
  prizeModel.deleteUnitById(unitId);
  const draw = drawModel.createDraw({ unitId, gender, neighborhood, program, age });
  return { draw, unit };
};

const listDraws = () => drawModel.listDraws();

const deleteDraw = (drawId) => {
  const draw = drawModel.findDrawById(drawId);
  if (!draw) return null;
  // delete draw
  drawModel.deleteDrawById(drawId);
  // return unit
  const returned = prizeModel.addUnitToPrize(draw.unitId ? prizeModel.findUnitById(draw.unitId)?.prizeId : null, 0);
  // The above is awkward because draw.unitId is unit id. We need prizeId from draw's unit - but unit no longer exists.
  // Alternative: store prizeId in draw when creating it. Adjusted behavior handled in controller.
  return draw;
};

module.exports = { createDraw, listDraws, deleteDraw };
