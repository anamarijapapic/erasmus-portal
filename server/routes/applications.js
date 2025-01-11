const express = require('express');
var multer = require('multer');
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  downloadFile,
  deleteFile,
  uploadFile,
} = require('../controllers/applicationController.js');

router.get('/', getAllApplications);

router.get('/:id', getApplication);
router.post('/', multer().array('files', 5), createApplication);
router.patch('/:id', updateApplication);

router.delete('/:id', deleteApplication);

router.get('/downloadFile/:id', downloadFile);
router.delete('/deleteFile/:id', deleteFile);
router.post('/uploadFile/:id', multer().single('file'), uploadFile);

module.exports = router;
