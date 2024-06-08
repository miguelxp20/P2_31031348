require('dotenv').config();
const ContactosModel = require("../models/ContactosModel");
const nodemailer = require('nodemailer');
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;
const USER_DESTINO1 = process.env.USER_DESTINO1;
// const USER_DESTINO2 = process.env.USER_DESTINO2;

class ContactosController {
    constructor(){
        this.contactosModel = new ContactosModel();
        this.add = this.add.bind(this);
        this.transporter = nodemailer.createTransport({
          service : 'gmail',
          auth : {
            user : USER_EMAIL,
            pass : USER_PASS
          }
        });
    }

    enviarCorreo(name, email, comment, USER_EMAIL, USER_DESTINO1){
      const mailOptions = {
        from : USER_EMAIL,
        to : [email, USER_DESTINO1],
        subject : 'Registro de formulario',
        text : 'Usuario: '+name+'\nEmail: '+email+'\nComentario: '+comment
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error){
          console.log(error);
        }
        else {
          console.log('Correo enviado con éxito.');
        }
      });
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

        await this.enviarCorreo(name, email, comment, USER_EMAIL, USER_DESTINO1);
    
        console.log(contactos);

        res.send("hjdji");
    }
}

module.exports = ContactosController;