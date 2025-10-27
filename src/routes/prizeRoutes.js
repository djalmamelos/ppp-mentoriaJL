const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/prizeController');

router.post('/', prizeController.createPrize);
router.get('/', prizeController.listPrizes);
router.get('/:id', prizeController.getPrize);
router.delete('/unit/:unitId', prizeController.deleteUnit);

module.exports = router;
