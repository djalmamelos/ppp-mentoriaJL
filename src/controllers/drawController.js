const drawService = require('../services/drawService');
const drawModel = require('../models/drawModel');
const prizeModel = require('../models/prizeModel');

// helper for age groups
const ageGroup = (age) => {
  const a = Number(age);
  if (isNaN(a)) return 'unknown';
  if (a <= 17) return '0-17';
  if (a <= 24) return '18-24';
  if (a <= 29) return '25-29';
  if (a <= 39) return '30-39';
  if (a <= 49) return '40-49';
  if (a <= 59) return '50-59';
  return '60+';
};

const createDraw = (req, res) => {
  const { unitId, gender, neighborhood, program, age } = req.body;
  if (!unitId) return res.status(400).json({ error: 'unitId_required' });
  // find unit and prizeId before delete
  const unit = prizeModel.findUnitById(unitId);
  if (!unit) return res.status(404).json({ error: 'unit_not_found' });
  const prizeId = unit.prizeId;
  // remove unit and create draw storing prizeId
  prizeModel.deleteUnitById(unitId);
  const draw = drawModel.createDraw({ unitId, prizeId, gender, neighborhood, program, age });
  return res.status(201).json(draw);
};

const listDraws = (req, res) => {
  const draws = drawModel.listDraws();
  // aggregate totals by parameters
  const totals = {
    gender: {},
    neighborhood: {},
    program: {},
    ageGroup: {}
  };
  draws.forEach(d => {
    if (d.gender) totals.gender[d.gender] = (totals.gender[d.gender] || 0) + 1;
    if (d.neighborhood) totals.neighborhood[d.neighborhood] = (totals.neighborhood[d.neighborhood] || 0) + 1;
    if (d.program) totals.program[d.program] = (totals.program[d.program] || 0) + 1;
    const ag = ageGroup(d.age);
    totals.ageGroup[ag] = (totals.ageGroup[ag] || 0) + 1;
  });

  return res.json({ draws, totals });
};

const deleteDraw = (req, res) => {
  const drawId = req.params.id;
  const draw = drawModel.findDrawById(drawId);
  if (!draw) return res.status(404).json({ error: 'draw_not_found' });
  // return a unit to the prize
  const prizeId = draw.prizeId;
  prizeModel.addUnitToPrize(prizeId, 1);
  drawModel.deleteDrawById(drawId);
  return res.status(204).send();
};

module.exports = { createDraw, listDraws, deleteDraw };
