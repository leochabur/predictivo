const { Esquema } = require('../database/config');
const { DataTypes, Model} = require('sequelize');

const Estructura = Esquema.define("estructuras", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  direccion: {
      type: DataTypes.STRING
  }
});



module.exports = { Estructura };