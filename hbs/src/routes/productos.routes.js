/* ---------------------------- MODULOS -----------------------------*/
const express = require('express');
const router = express.Router();
const Contenedor = require('../fileSystem.js');

/* ------------------------- BASE DE DATOS --------------------------*/
const cont = new Contenedor('./src/productos.txt');

let DB_CONT = []

/* ------------------------------ RUTAS -----------------------------*/
router.get('/', async (req, res)=>{
    res.render('layouts/home');
    res.status(200);
});

router.get('/productos', async (req, res)=>{
    const products = await cont.getAll();
    DB_CONT = []
    products.map((product) => {
        DB_CONT.push(product)
    })

    res.render('layouts/products',{DB_CONT});
    res.status(200);
});

router.post('/productos', async (req, res)=>{
    const newID = await cont.save(req.body);
    const products = await cont.getAll();
    products.map(product => () => {
        DB_CONT.push(product)
    })
    const newProduct = {...req.body, id:newID}

    console.log('Agregado!', newProduct)
    res.redirect('/')
    res.status(201);
});

router.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

module.exports = router;