var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Curriculum Vitae - Miguel Ponce',
  fullName: "Miguel David Ponce Urbaez",
  position: "Ingeniero en Informatica, experto en Seguridad Informatica.",
  section: 2,
  id: 31031348
 });
});

module.exports = router;
