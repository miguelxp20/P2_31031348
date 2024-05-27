const ContactosModel = require("../models/ContactosModel");

class ContactosController {
    constructor(){
        this.contactosModel = new ContactosModel();
        this.add = this.add.bind(this);
    }

    async obtenerIp() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip; // Retorna la ip
      } catch (error) {
        console.error('Error al obtener la ip:', error);
        return null; // Retorna null si hay un error
      }
    }
  
    async obtenerPais(ip) {
      try {
        const response = await fetch('https://ipinfo.io/'+ip+'?token=197c576e48e0c3');
        const data = await response.json();
        return data.country; // Retorna el país
      } catch (error) {
        console.error('Error al obtener el país:', error);
        return null; // Retorna null si hay un error
      }
    }

    async add(req, res){
        // Validar los datos del formulario
        const { name, email, comment } = req.body;

    if (!name || !email || !comment) {
      res.status(400).send("Faltan campos requeridos");
      return;
    }


        //Guardar los datos del formulario
        const ip = await this.obtenerIp();
        const fecha = new Date().toISOString();
        const pais = await this.obtenerPais(ip);
        


        await this.contactosModel.crearContacto(name, email, comment, ip, fecha, pais);

        const contactos = await this.contactosModel.obtenerAllContactos();
    
        console.log(contactos);

        res.send("Formulario enviado con exito");
    }
}

module.exports = ContactosController;