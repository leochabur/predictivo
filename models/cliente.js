const { Esquema } = require('../database/config');
const { DataTypes, Model} = require('sequelize');
const { Estructura } = require('./estructura');

const Cliente = Esquema.define("clientes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_estructura: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  razon_social: {
    type: DataTypes.STRING
  },
  direccion: {
      type: DataTypes.STRING
  },
  activo: {
      type: DataTypes.BOOLEAN
  }
});

Cliente.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})

module.exports = { Cliente }