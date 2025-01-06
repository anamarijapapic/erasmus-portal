const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    server: 'up',
    database: dbState === 1 ? 'connected' : 'disconnected',
  });
});

module.exports = router;
