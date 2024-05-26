const toIndex = (req, res, next)=> {
    res.render('index', { 
      title: 'Express Formulario',
      title2: "Pagina de confirmacion"
    });
  };

  module.exports = toIndex;