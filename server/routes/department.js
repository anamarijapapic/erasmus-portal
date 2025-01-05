const express = require('express');
const router = express.Router();

const {
  getAllDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} = require('../controllers/departmentController.js');

router.get('/', getAllDepartments);

router.get('/:id', getDepartment);

router.post('/', createDepartment);

router.patch('/:id', updateDepartment);

router.delete('/:id', deleteDepartment);

module.exports = router;
