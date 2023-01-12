const express = require("express");
const app = express();
const mongoose= require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded());

app.use(cors());

app.use('/api', require('./src/routes'));

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('Conectado al Mongo');
    server = app.listen(process.env.API_PORT,(req, res)=> {
        console.log(`Aplicacion corriendo en el puerto ${process.env.API_PORT}!`)
    });    
});
