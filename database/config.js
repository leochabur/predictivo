const Sequelize =  require('sequelize');


const Esquema = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host:  process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
            return next()
          },
      },
      timezone: '-03:00'
});



module.exports = {  
    Esquema
}
