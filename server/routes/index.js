var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

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
