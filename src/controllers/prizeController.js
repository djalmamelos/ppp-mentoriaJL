const prizeService = require('../services/prizeService');
const prizeModel = require('../models/prizeModel');
const drawModel = require('../models/drawModel');

const createPrize = (req, res) => {
  const { name, quantity } = req.body;
  if (!name || !Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  const prize = prizeService.createPrize(name, quantity);
  return res.status(201).json(prize);
};

const listPrizes = (req, res) => {
  const prizes = prizeService.listPrizes();
  return res.json(prizes);
};

const getPrize = (req, res) => {
  const prize = prizeService.getPrize(req.params.id);
  if (!prize) return res.status(404).json({ error: 'not_found' });
  // include units ids
  const units = require('../db/inMemoryDb').units.filter(u => u.prizeId === prize.id);
  return res.json({ ...prize, units });
};

const deleteUnit = (req, res) => {
  const unitId = req.params.unitId;
  const unit = prizeModel.findUnitById(unitId);
  if (!unit) return res.status(404).json({ error: 'unit_not_found' });
  prizeService.deleteUnit(unitId);
  return res.status(204).send();
};

const deletePrize = (req, res) => {
  const prizeId = req.params.id;
  const result = prizeService.deletePrize(prizeId);
  if (!result) return res.status(404).json({ error: 'not_found' });
  if (result && result.error === 'prize_has_units') return res.status(400).json({ error: 'prize_has_units' });
  return res.status(204).send();
};

const updateUnit = (req, res) => {
  const unitId = req.params.unitId;
  const { prizeId } = req.body;
  if (!prizeId) return res.status(400).json({ error: 'prizeId_required' });
  const unit = prizeModel.findUnitById(unitId);
  if (!unit) return res.status(404).json({ error: 'unit_not_found' });
  const prize = prizeModel.findPrizeById(prizeId);
  if (!prize) return res.status(404).json({ error: 'prize_not_found' });

  const updated = prizeService.updateUnit(unitId, prizeId);
  if (!updated) return res.status(500).json({ error: 'update_failed' });

  // Update any draws that reference this unit so their prizeId stays consistent
  const draws = drawModel.listDraws();
  draws.forEach(d => {
    if (d.unitId === unitId) d.prizeId = prizeId;
  });

  return res.json(updated);
};

module.exports = { createPrize, listPrizes, getPrize, deleteUnit, deletePrize, updateUnit };
