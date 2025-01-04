const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
} = require('../controllers/userController.js');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id/change-password', changePassword);
router.delete('/:id', deleteUser);

module.exports = router;
