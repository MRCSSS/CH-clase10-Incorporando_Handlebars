/* ---------------------------- MODULOS -----------------------------*/
const express = require('express');
const morgan = require('morgan');

/* ---------------------- INSTANCIA DE SERVER -----------------------*/
const app = express();
const router = require('./src/routes/productos.routes.js');

/* ---------------------- MOTOR DE PLANTILLAS -----------------------*/
app.set('views', './views');
app.set('view engine', 'pug');

/* -------------------------- MIDDLEWARES ---------------------------*/
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/* ------------------------------ RUTAS -----------------------------*/
app.use('/', router)

/* ---------------------------- SERVIDOR ----------------------------*/
const PORT = 8082;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})

server.on('error', err => {
    console.log(`Server error: ${err}`);
})