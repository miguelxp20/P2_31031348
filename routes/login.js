var express = require('express');
var router = express.Router();

/* GET contactos page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;