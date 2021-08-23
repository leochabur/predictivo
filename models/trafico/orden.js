const { Esquema } = require('../../database/config');
const { DataTypes } = require('sequelize');
const { Estructura } = require('../estructura');
const { Ciudad } = require('../ciudad');
const { Cliente } = require('../cliente');
const { Servicio } = require('./servicio');

const Orden = Esquema.define("ordenes", {
                                        id:                     { type: DataTypes.INTEGER, primaryKey: true },
                                        id_estructura:          { type: DataTypes.INTEGER, primaryKey: true },
                                        fservicio:              { type: DataTypes.DATEONLY },
                                        nombre:                 { type: DataTypes.STRING },
                                        id_ciudad_origen:       { type: DataTypes.INTEGER },
                                        id_ciudad_destino:      { type: DataTypes.INTEGER },
                                        id_cliente:             { type: DataTypes.INTEGER },
                                        hcitacion:              { type: DataTypes.TIME },
                                        hsalida:                { type: DataTypes.TIME },
                                        hllegada:               { type: DataTypes.TIME },
                                        hfinservicio:           { type: DataTypes.TIME },
                                        id_servicio:            { type: DataTypes.INTEGER },
                                        borrada:                { type: DataTypes.BOOLEAN },
                                        vacio:                  { type: DataTypes.BOOLEAN }
});

Orden.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})
Orden.belongsTo(Ciudad, {as: 'origen', foreignKey: 'id_ciudad_origen', targetKey:'id'})
Orden.belongsTo(Ciudad, {as: 'destino', foreignKey: 'id_ciudad_destino', targetKey:'id'})
Orden.belongsTo(Cliente, {as:'cliente', foreignKey: 'id_cliente', targetKey:'id'})
Orden.belongsTo(Servicio, {foreignKey: 'id_servicio', targetKey:'id'})

module.exports = { Orden }