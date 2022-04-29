/* Imports */
const express = require('express');
const {Router} = express;
const db = require('./dB/dB.js');
let userState = require('./public/public.js');

/* Controllers */
/** Db **/
let handler = new db('dB.txt');

/** Server **/
/*** Routers ***/
/**** Users ****/
const routerUsers = Router();
routerUsers.use(express.json());
routerUsers.use(express.urlencoded({extended: true}));

/**** Admin ****/
const routerAdmin = Router();
routerAdmin.use(express.json());
routerAdmin.use(express.urlencoded({extended: true}));

/**** Cart ****/
const routerCart = Router();
routerCart.use(express.json());
routerCart.use(express.urlencoded({extended: true}));

/*** App ***/
const app = express();
const PORT = 8080;

app.use('/home', express.static(__dirname + '/public')); 


app.use('/home/users', routerUsers);
app.use('/home/admin', routerAdmin);
app.use('/home/cart', routerCart);

/** Server messages **/
const server = app.listen(PORT, () => {
    console.log(`Server standby, listening on port ${server.address().port}.`)
})

/** Server error handler **/
server.on('error', err => console.log(`Error: ${err}`));

/** Server petitions handlers **/
/*** Get ***/
if (userState){
    routerAdmin.get('/products/list', (req, res) => {
        /* Bloque a optimizar porque repiten tareas */
    })
}
else{
    routerUsers.get('/products/list', async (req, res) => {
        console.log(userState)
        console.log('entro else')
        let data = await handler.getAll()
        console.log(data);

        if (data == undefined){
            // let empty = [{prueba: 'test'}]
            // let temp = JSON.stringify(empty)
            // let empty = '';
            // let temp = 'una prueba mas'
            handler.saveData('');
            res.send(
                `<p><strong>No data to show</strong></p>`
            )
        }
        else{
            let html = '';
            if(data == ''){
               res.send(
                   `<p><strong>Still NO data to show</strong></p>`
               )
            }
            else{
                data.map( (product) => {
                   let temp = `<div>
                                   <p>Product id: ${product.id}</p>
                                   <p>Product category: ${product.category}</p>
                                   <p>Product name: ${product.name}</p>
                                   <p>Product description: ${product.description}</p>
                                   <p>Product code: ${product.code}</p>
                                   <p>Product stock: ${product.stock}</p>
                               </div> 
                               <br>`
                   html += temp;
                })
                res.send(html);
            }  
        }
    })
}
// routerCart.get('/')

/*** Post ***/
routerAdmin.post('products/add', (req, res) => {

})

/*** Put ***/
routerAdmin.put('products/update', (req, res) => {

})

/*** Delete ***/
routerAdmin.delete('products/delete/:id', (req, res) => {

})
