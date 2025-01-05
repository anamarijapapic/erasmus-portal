const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institutionController');

router.get('/', institutionController.getInstitutions);
router.get('/:id', institutionController.getInstitution);
router.post('/', institutionController.createInstitution);
router.delete('/:id', institutionController.deleteInstitution);
router.put('/:id', institutionController.updateInstitution);

module.exports = router;
