const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/prizeController');

router.post('/', prizeController.createPrize);
router.get('/', prizeController.listPrizes);
router.delete('/unit/:unitId', prizeController.deleteUnit);
router.patch('/unit/:unitId', prizeController.updateUnit);
router.get('/:id', prizeController.getPrize);
router.delete('/:id', prizeController.deletePrize);

module.exports = router;
