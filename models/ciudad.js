const { Esquema } = require('../database/config');
const { DataTypes } = require('sequelize');
const { Estructura } = require('./estructura');

const Ciudad = Esquema.define("ciudades", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_estructura: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  ciudad: {
    type: DataTypes.STRING
  }
});

Ciudad.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})

module.exports = { Ciudad }