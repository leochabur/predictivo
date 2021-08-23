const { Esquema } = require('../../database/config');
const { DataTypes } = require('sequelize');
const { Estructura } = require('../estructura');
const { Cronograma } = require('./cronograma');


const Servicio = Esquema.define("servicios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_estructura: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_cronograma: {
    type: DataTypes.INTEGER
  },
  hcitacion: {
    type: DataTypes.TIME
  },
  hsalida: {
    type: DataTypes.TIME
  },
  hllegada: {
    type: DataTypes.TIME
  },
  hfinserv: {
    type: DataTypes.TIME
  },
  activo: {
    type: DataTypes.BOOLEAN
  }
});

Servicio.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})
Servicio.belongsTo(Cronograma, {foreignKey: 'id_cronograma', targetKey:'id'})


module.exports = { Servicio }