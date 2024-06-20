var express = require('express');
var router = express.Router();
var db = require('../conf/database');

// Middleware para verificar la autenticación
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Debes iniciar sesión para ver esta página.');
  res.redirect('/auth/login');
}

// Ruta de contactos protegida
router.get('/', ensureAuthenticated, (req, res, next) => {
  db.all('SELECT * FROM contactos', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('contactos', { data: rows });
  });
});

module.exports = router;