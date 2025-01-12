const express = require('express');

const {
  getAllStudyProgrammes,
  getStudyProgramme,
  createStudyProgramme,
  deleteStudyProgramme,
  updateStudyProgramme,
} = require('../controllers/studyProgrammeController.js');

const router = express.Router();

router.get('/', getAllStudyProgrammes);
router.get('/:id', getStudyProgramme);

router.post('/', createStudyProgramme);
router.delete('/:id', deleteStudyProgramme);
router.put('/:id', updateStudyProgramme);

module.exports = router;
