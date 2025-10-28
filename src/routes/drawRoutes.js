const express = require('express');
const router = express.Router();
const drawController = require('../controllers/drawController');

router.post('/', drawController.createDraw);
router.get('/', drawController.listDraws);
router.delete('/:id', drawController.deleteDraw);
router.patch('/:id', drawController.updateDraw);

module.exports = router;
