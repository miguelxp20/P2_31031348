var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Programacion2-2024',
  fullName: "Miguel David",
  full_surname: "Ponce Urbaez",
  section: 2,
  id: 31031348
 });
});

module.exports = router;
