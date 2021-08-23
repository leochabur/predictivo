const { Esquema } = require('../../database/config');
const { DataTypes } = require('sequelize');
const { Estructura } = require('../estructura');

const ClaseServicio = Esquema.define("claseservicio", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_estructura: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        clase: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        tableName: 'claseservicio'
    });

ClaseServicio.belongsTo(Estructura, {foreignKey: 'id_estructura', targetKey: 'id'})

module.exports = { ClaseServicio }