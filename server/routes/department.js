// GET /departments
// GET /departments/:departmentId
// POST /departments
// PUT /departments/:departmentId
// DELETE /departments/:departmentId
// Filter by (e.g. country, institution)
// Pagination support
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
