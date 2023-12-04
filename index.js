const express = require("express");
const app = express();
const PORT = 8800;
const dotenv = require("dotenv");
const routes = require('./backend/routes/routes');
const logger= require('morgan');
dotenv.config();
const path= require('path');
const cookieParser = require('cookie-parser');

//swagger
const swaggerUI= require('swagger-ui-express');
const swaggerJsDoc= require('swagger-jsdoc')
const swaggerSpec={
  definition:{
    openapi: "3.0.0",
    info:{
      title:"DA-FIT Documentación",
      version: "1.0.0"
    },
    servers:[
      {
        url:"http:localhost:8800"
      }
    ]
  },
  apis:[`${path.join(__dirname, "/docs/*.js")}`]
}

//logger
app.use(logger('dev'));
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
app.use('/api/v1', routes);


app.set("view engine", "ejs");
app.set("views", path.join("frontend/views"));

app.use(express.static(path.join(__dirname,'frontend')));


//middleware para manejar los errores
app.use((err, req, res, next) => {
  // Establecer el código de estado y el mensaje del error
  res.status(err.status || 500);
  res.locals.message = err.message;

  // Renderizar la vista de error
  res.render('pages/error', {title: 'Error'});
});

//puerto
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto:${PORT}`);
  });