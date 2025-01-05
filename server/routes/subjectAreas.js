var express = require('express');

const {
  getAllSubjectAreas,
  searchSubjectAreas,
  getSubjectArea,
  createSubjectArea,
  updateSubjectArea,
  deleteSubjectArea,
} = require('../controllers/subjectAreaController.js');

const router = express.Router();

router.get('/', getAllSubjectAreas);
router.get('/searchSubjectArea/:searchInput/', searchSubjectAreas);
router.get('/:id', getSubjectArea);

router.post('/', createSubjectArea);
router.delete('/:id', deleteSubjectArea);
router.patch('/editSubjectArea/:id', updateSubjectArea);

module.exports = router;
