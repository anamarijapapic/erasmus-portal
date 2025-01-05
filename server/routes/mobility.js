const express = require('express');
const router = express.Router();

const {
  getAllMobilities,
  getMobility,
  createMobility,
  deleteMobility,
  updateMobility,
} = require('../controllers/mobilityController');

router.get('/', getAllMobilities);

router.get('/:id', getMobility);

router.post('/', createMobility);

router.patch('/:id', updateMobility);

router.delete('/:id', deleteMobility);

module.exports = router;
