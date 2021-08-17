const fs = require('fs');
const express = require('express');

const PORT = 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on("error", error => console.log(`Error en el servidor ${error}`))

async function leer(){
    try{
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
        console.log(contenido);
        foo(contenido);

    }
    catch (err) { 
        console.log('Error de lectura ', err)
    }
}

//const productos = [];
//let contItems = 0;
//let contItemRandom = 0;
leer()

function foo(contenido){

    const productos = JSON.parse(contenido);
    //console.log(productos)
    let contItems = 0;
    let contItemRandom = 0;
    let nro = parseInt(Math.random() * (productos.length-1));
    console.log(nro)

app.get('/items', (req, res)=>{
    contItems++ ;
    res.json({
        items : productos ,
        cantidad : productos.length
    })
});

app.get('/item-random', (req, res)=>{
    contItemRandom++ ;
    res.json({
        item : productos[nro],
    });
});

app.get('/visitas', (req, res)=>{
    res.json({
        visitas : {items: contItems, item: contItemRandom} 
    })
});
}