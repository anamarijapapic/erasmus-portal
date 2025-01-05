var express = require('express');

const {
  getAllStudyProgrammes,
  getStudyProgramme,
  createStudyProgramme,
  filterStudyProgrammes,
  deleteStudyProgramme,
  updateStudyProgramme,
} = require('../controllers/studyProgrammeController.js');

const router = express.Router();

router.get('/', getAllStudyProgrammes);
router.get('/filter', filterStudyProgrammes);
//router.get('/studyProgrammes/:searchInput/', searchSubjectAreas);
router.get('/:id', getStudyProgramme);

router.post('/', createStudyProgramme);
router.delete('/:id', deleteStudyProgramme);
router.patch('/editStudyProgramme/:id', updateStudyProgramme);

module.exports = router;
