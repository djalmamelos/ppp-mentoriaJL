const prizeService = require('../services/prizeService');
const prizeModel = require('../models/prizeModel');

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

module.exports = { createPrize, listPrizes, getPrize, deleteUnit, deletePrize };
