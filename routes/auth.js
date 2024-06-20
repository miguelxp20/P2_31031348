var express = require('express');
var passport = require('passport');
var router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para manejar el login con la estrategia local
router.post('/login', passport.authenticate('local', {
  successRedirect: '/contactos',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// Ruta para manejar la autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/auth/login',
    failureFlash: true 
  }),
  (req, res) => {
    res.redirect('/contactos');
  }
);

// Ruta para el logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'Sesión cerrada exitosamente.');
    res.redirect('/auth/login');
  });
});

module.exports = router;