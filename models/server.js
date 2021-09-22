const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const { Esquema } = require('../database/config');

class Server {


    constructor() 
    {
        this.app  = express();
        this.port = process.env.PORT_NUMBER;
        this.usuariosPath = '/api/usuarios';
        this.consultasPath = '/api/consultas';

        // Conectar a base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
        this.options = {
                            key:  fs.readFileSync("/etc/letsencrypt/live/dev-masterbus.tech/privkey.pem"),
                            cert: fs.readFileSync("/etc/letsencrypt/live/dev-masterbus.tech/fullchain.pem")
                        };

        this.httpsServer = https.createServer(this.options, this.app);
    }

    async dbConnection() 
    {        try {
            
            await Esquema.authenticate();
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
        this.app.use( this.consultasPath, require('../routes/consultas'));
        
    }

    listen() {
       /* this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });*/
        this.httpsServer.listen(this.port, () => {
            console.log('HTTPS Server running on port ', this.port);
        });
       // https.createServer(this.options, this.app).listen(8443);
    }

}




module.exports = Server;
