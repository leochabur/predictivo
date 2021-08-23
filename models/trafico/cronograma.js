const { Esquema } = require('../../database/config');
const { DataTypes } = require('sequelize');
const { Estructura } = require('../estructura');
const { Ciudad } = require('../ciudad');
const { Cliente } = require('../cliente');
const { ClaseServicio } = require('./claseServicio');

const Cronograma = Esquema.define("cronogramas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_estructura: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  ciudades_id_origen: {
    type: DataTypes.INTEGER
  },
  ciudades_id_destino: {
    type: DataTypes.INTEGER
  },
  id_cliente: {
    type: DataTypes.INTEGER
  },
  claseServicio_id: {
    type: DataTypes.INTEGER
  },
  activo: {
    type: DataTypes.BOOLEAN
  },
  vacio: {
    type: DataTypes.BOOLEAN
  }
});

Cronograma.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})
Cronograma.belongsTo(Ciudad, {as: 'origen', foreignKey: 'ciudades_id_origen', targetKey:'id'})
Cronograma.belongsTo(Ciudad, {as: 'destino', foreignKey: 'ciudades_id_destino', targetKey:'id'})
Cronograma.belongsTo(Cliente, {as:'cliente', foreignKey: 'id_cliente', targetKey:'id'})
Cronograma.belongsTo(ClaseServicio, {foreignKey: 'claseServicio_id', targetKey:'id'})

module.exports = { Cronograma }