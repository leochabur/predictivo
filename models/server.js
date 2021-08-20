const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT_NUMBER;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async dbConnection() 
    {        try {
            
            await db.authenticate();
            console.log('Database online');

        } 
        catch (error) 
        {   
            console.log('Error de comunicacion');
            throw new Error( error );
        }

    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
