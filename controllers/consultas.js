const { response, request } = require('express');
const  moment  = require('moment');

const { Ciudad } = require('../models/ciudad');
const { Cliente } = require('../models/cliente');
const { Estructura } = require('../models/estructura');
const { ClaseServicio } = require('../models/trafico/claseServicio');
const { Cronograma } = require('../models/trafico/cronograma');
const { Orden } = require('../models/trafico/orden');
const { Servicio } = require('../models/trafico/servicio');
const { Esquema } = require('../database/config');

const clientesGet = async(req = request, res = response) => {

    Servicio.findAll()
              .then((estructuras) => {
                                       console.log(estructuras);
                                       res.json(estructuras);
              })
              .catch((error) => {
                                       console.log(error);
              });
}

const ordenesGet = async(req = request, res = response) => {

    const { stamp } = req.params;
  
    const fecha = new Date(stamp);
    var day = moment(fecha);
    console.log(day);
    Orden.findAll({
                    where : { fservicio : day.format('YYYY-MM-DD') }
                })
              .then((estructuras) => {
                                       console.log(estructuras);
                                       res.json(estructuras);
              })
              .catch((error) => {
                                       console.log(error);
              });
}

const ordenesNowGet = async(req = request, res = response) => {
  
    const fecha = new Date();
    var day = moment(fecha);

    const ordenes = await Esquema.query("SELECT nombre FROM ordenes WHERE '"+day.format('YYYY-MM-DD hh:mm:ss')+"' BETWEEN CONCAT(fservicio,' ', hcitacion) AND CONCAT(fservicio,' ', hllegada) AND borrada = 0 AND vacio = 0 AND id_estructura = 1");
    console.log(ordenes);
}

module.exports = {
    clientesGet,
    ordenesGet,
    ordenesNowGet 
}