const { response, request } = require('express');
const soap = require('soap')
const  moment  = require('moment');
const axios = require('axios')

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
  
    day.subtract(3, 'hours'); 
    const ordenes = await Esquema.query("SELECT now() as ahora, ord.nombre as nombre, ord.id, hllegadaplantareal as hllegada, hsalidaplantareal as hsalida, hfinservicioreal as hfinalizacion, "+
                                                "CONCAT(apellido,', ', emp.nombre) as conductor, hcitacionreal as hcitacion, interno, o.ciudad as origen, d.ciudad as destino "+
                                        "FROM (SELECT id_chofer_1, hcitacionreal, vacio, borrada, id_ciudad_origen, id_ciudad_destino, id_servicio, id_micro, nombre, id, hllegadaplantareal , hsalidaplantareal, hfinservicioreal, id_estructura, id_cliente, fservicio "+
                                               "FROM ordenes "+
                                               "WHERE id_estructura = 1 and not borrada and fservicio between DATE_SUB(DATE(NOW()), INTERVAL 1 DAY) AND DATE_ADD(DATE(NOW()), INTERVAL 1 DAY) "+
                                               ") ord "+
                                        "JOIN ciudades o on ord.id_ciudad_origen = o.id "+
                                        "JOIN ciudades d on d.id = ord.id_ciudad_destino "+
                                        "LEFT JOIN empleados emp ON emp.id_empleado = ord.id_chofer_1 "+
                                        "JOIN (SELECT i_v, id from servicios where id_estructura = 1) s ON s.id = ord.id_servicio "+
                                        "JOIN unidades u ON u.id = ord.id_micro "+
                                        "WHERE i_v = 'i' AND NOW() BETWEEN DATE_SUB(CONCAT(fservicio,' ', ord.hsalidaplantareal), INTERVAL 15 MINUTE) AND DATE_ADD(CONCAT(fservicio,' ', ord.hfinservicioreal), INTERVAL 10 MINUTE) "+
                                        "AND id_cliente = "+cliente+" AND vacio = 0 AND borrada = 0 AND ord.id_estructura = 1 ORDER BY nombre", {type: Sequelize.QueryTypes.SELECT});
    res.json(ordenes);
    console.log(ordenes);
}

const ordenesAllNow = async(req = request, res = response) => 
{
  
    const fecha = new Date();
    var day = moment(fecha);
  
    day.subtract(3, 'hours'); 
    const ordenes = await Esquema.query("SELECT now() as ahora, ord.nombre as nombre, ord.id, hllegadaplantareal as hllegada, hsalidaplantareal as hsalida, hfinservicioreal as hfinalizacion, "+
                                                "CONCAT(apellido,', ', emp.nombre) as conductor, hcitacionreal as hcitacion, interno, o.ciudad as origen, d.ciudad as destino "+
                                        "FROM (SELECT id_chofer_1, hcitacionreal, vacio, borrada, id_ciudad_origen, id_ciudad_destino, id_servicio, id_micro, nombre, id, hllegadaplantareal , hsalidaplantareal, hfinservicioreal, id_estructura, id_cliente, fservicio "+
                                               "FROM ordenes "+
                                               "WHERE id_estructura = 1 and not borrada and fservicio between DATE_SUB(DATE(NOW()), INTERVAL 1 DAY) AND DATE_ADD(DATE(NOW()), INTERVAL 1 DAY) "+
                                               ") ord "+
                                        "JOIN ciudades o on ord.id_ciudad_origen = o.id "+
                                        "JOIN ciudades d on d.id = ord.id_ciudad_destino "+
                                        "LEFT JOIN empleados emp ON emp.id_empleado = ord.id_chofer_1 "+
                                        "JOIN (SELECT i_v, id from servicios where id_estructura = 1) s ON s.id = ord.id_servicio "+
                                        "JOIN unidades u ON u.id = ord.id_micro "+
                                        "WHERE i_v = 'i' AND NOW() BETWEEN DATE_SUB(CONCAT(fservicio,' ', ord.hsalidaplantareal), INTERVAL 15 MINUTE) AND DATE_ADD(CONCAT(fservicio,' ', ord.hfinservicioreal), INTERVAL 10 MINUTE) "+
                                        "AND vacio = 0 AND borrada = 0 AND ord.id_estructura = 1 ORDER BY nombre", {type: Sequelize.QueryTypes.SELECT});
    res.json(ordenes);
    console.log(ordenes);
}

const ordenesNowStructure = async(req = request, res = response) => 
{
  
    const { cliente, estructura } = req.params;
    const fecha = new Date();
    var day = moment(fecha);
  
    day.subtract(3, 'hours'); 
    const ordenes = await Esquema.query("SELECT now() as ahora, ord.nombre as nombre, ord.id, hllegadaplantareal as hllegada, hsalidaplantareal as hsalida, hfinservicioreal as hfinalizacion, "+
                                                "CONCAT(apellido,', ', emp.nombre) as conductor, hcitacionreal as hcitacion, interno, o.ciudad as origen, d.ciudad as destino "+
                                        "FROM (SELECT id_chofer_1, hcitacionreal, vacio, borrada, id_ciudad_origen, id_ciudad_destino, id_servicio, id_micro, nombre, id, hllegadaplantareal , hsalidaplantareal, hfinservicioreal, id_estructura, id_cliente, fservicio "+
                                               "FROM ordenes "+
                                               "WHERE id_estructura = "+estructura+" and not borrada and fservicio between DATE_SUB(DATE(NOW()), INTERVAL 1 DAY) AND DATE_ADD(DATE(NOW()), INTERVAL 1 DAY) "+
                                               ") ord "+
                                        "JOIN ciudades o on ord.id_ciudad_origen = o.id "+
                                        "JOIN ciudades d on d.id = ord.id_ciudad_destino "+
                                        "LEFT JOIN empleados emp ON emp.id_empleado = ord.id_chofer_1 "+
                                        "JOIN (SELECT i_v, id from servicios where id_estructura = "+estructura+") s ON s.id = ord.id_servicio "+
                                        "JOIN unidades u ON u.id = ord.id_micro "+
                                        "WHERE i_v = 'i' AND NOW() BETWEEN DATE_SUB(CONCAT(fservicio,' ', ord.hsalidaplantareal), INTERVAL 15 MINUTE) AND DATE_ADD(CONCAT(fservicio,' ', ord.hfinservicioreal), INTERVAL 10 MINUTE) "+
                                        "AND id_cliente = "+cliente+" AND vacio = 0 AND borrada = 0 AND ord.id_estructura = "+estructura+" ORDER BY nombre", {type: Sequelize.QueryTypes.SELECT});
    res.json(ordenes);
    console.log(ordenes);
}

const getServiciosRondines = async(req = request, res = response) => 
{
    const { cliente, estructura } = req.params;

    const ordenes = await Esquema.query("SELECT now() as ahora, ord.nombre as nombre, ord.id, hllegadaplantareal as hllegada, hsalidaplantareal as hsalida, hfinservicioreal as hfinalizacion, "+
                                                "CONCAT(apellido,', ', emp.nombre) as conductor, hcitacionreal as hcitacion, interno, o.ciudad as origen, d.ciudad as destino "+
                                        "FROM (SELECT id_chofer_1, hcitacionreal, vacio, borrada, id_ciudad_origen, id_ciudad_destino, id_servicio, id_micro, nombre, id, hllegadaplantareal , hsalidaplantareal, hfinservicioreal, id_estructura, id_cliente, fservicio "+
                                               "FROM ordenes "+
                                               "WHERE id_estructura = "+estructura+" and not borrada and fservicio between DATE_SUB(DATE(NOW()), INTERVAL 1 DAY) AND DATE_ADD(DATE(NOW()), INTERVAL 1 DAY) "+
                                               ") ord "+
                                        "JOIN ciudades o on ord.id_ciudad_origen = o.id "+
                                        "JOIN ciudades d on d.id = ord.id_ciudad_destino "+
                                        "LEFT JOIN empleados emp ON emp.id_empleado = ord.id_chofer_1 "+
                                        "JOIN (SELECT i_v, id from servicios where id_estructura = "+estructura+") s ON s.id = ord.id_servicio "+
                                        "JOIN unidades u ON u.id = ord.id_micro "+
                                        "WHERE (upper(ord.nombre) like '%RONDIN%') AND i_v = 'i' AND NOW() BETWEEN DATE_SUB(CONCAT(fservicio,' ', ord.hsalidaplantareal), INTERVAL 15 MINUTE) AND DATE_ADD(CONCAT(fservicio,' ', ord.hfinservicioreal), INTERVAL 10 MINUTE) "+
                                        "AND id_cliente = "+cliente+" AND vacio = 0 AND borrada = 0 AND ord.id_estructura = "+estructura+" ORDER BY nombre", {type: Sequelize.QueryTypes.SELECT});
    res.json(ordenes);
    console.log(ordenes);
}

const positionGet = async(req = request, res = response) => {

    const { interno } = req.params;
    var url = 'https://app.urbetrack.com/App_services/Operation.asmx?wsdl';
    var args = {usuario: 'masterbus_trafico', hash: '85CF3EC9C355539B74F36AB7D03BBC1C', interno};

    soap.createClient(url, function(err, client) {
        client.ApiGetLocationByVehicle(args, function(err, result) {
            if (err)
            {
                res.status(501, 'Error interno')
            }
            else
            {
                res.json(result)
            }
        });
    });
}

const distanciePosition = async(req = request, res = response) => {

    const { latuser, longuserm, latinterno, longinterno } = req.body;
   

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+latuser+','+longuserm+'&destinations='+latinterno+','+longinterno+'&language=es&key=AIzaSyBMWxzUoadM_CcbqLBeqGp2xMYfSjyMJ-M',
        headers: { crossdomain: true }
      };
      
      axios(config)
      .then(({data}) => {
        if (data.status)
        {
            return { address: data.origin_addresses[0], rows : data.rows };
        }
        return res.json({ ok : false, message : 'Error al realizar la busqueda!'})
      })
      .then((data) => {
          const { address, rows } = data
          const { elements } = rows[0]
          const { status, distance, duration } = elements[0]
          if (status == 'ZERO_RESULTS')
          {
            return res.json({ ok : false, message : 'No se han encontrado resultados'})
          }
          
          res.json({address, distancia: distance.text, tiempo : duration.text})
      })
      .catch(function (error) {
        console.log(error);
      });
}

module.exports = {
    clientesGet,
    ordenesGet,
    ordenesNowGet,
    positionGet,
    distanciePosition,
    ordenesAllNow,
    ordenesNowStructure,
    getServiciosRondines
}