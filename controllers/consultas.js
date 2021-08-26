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
const Sequelize =  require('sequelize');

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
  
    const { cliente } = req.params;
    const fecha = new Date();
    var day = moment(fecha);

    const ordenes = await Esquema.query("SELECT nombre, ord.id, ord.hcitacion, ord.hllegada, interno, d.ciudad as origen, d.ciudad as destino "+ 
                                        "FROM ordenes ord "+
                                        "JOIN ciudades o on ord.id_ciudad_origen = o.id "+
                                        "JOIN ciudades d on d.id = ord.id_ciudad_destino "+
                                        "JOIN servicios s ON s.id = ord.id "+
                                        "JOIN unidades u ON u.id = ord.id_micro "+
                                        "WHERE i_v = 'i' AND '"+day.format('YYYY-MM-DD hh:mm:ss')+"' BETWEEN CONCAT(fservicio,' ', ord.hcitacion) AND CONCAT(fservicio,' ', ord.hllegada) AND id_cliente = "+cliente+" AND vacio = 0 AND borrada = 0 AND ord.id_estructura = 1 ORDER BY nombre", {type: Sequelize.QueryTypes.SELECT});
    res.json(ordenes);
    console.log(ordenes);
}

module.exports = {
    clientesGet,
    ordenesGet,
    ordenesNowGet 
}