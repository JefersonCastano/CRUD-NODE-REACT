const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Middleware
app.use(cors());

// Para poder leer los datos que vienen en el body de una petición POST
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bikes_crud"
});

// Petición POST para crear un producto
app.post("/create",(req,res)=>{
    const product_name = req.body.product_name;
    const brand_id = req.body.brand_id;
    const category_id = req.body.category_id;
    const model_year = req.body.model_year;
    const list_price = req.body.list_price;
    
    const sqlInsert = "INSERT INTO products (product_name, brand_id, category_id, model_year, list_price) VALUES (?,?,?,?,?);";
    db.query(sqlInsert,[product_name, brand_id, category_id, model_year, list_price],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Petición GET para obtener todos los productos
app.get("/bikes",(req,res)=>{
    db.query('SELECT product_id, product_name, model_year, list_price, brand_name, brand_home_country, brand_provider, category_name, category_description, p.brand_id AS brand_id, p.category_id AS category_id FROM products p INNER JOIN brands b ON p.brand_id = b.brand_id INNER JOIN categories c ON p.category_id = c.category_id;',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    }
    );
});

// Petición GET para obtener todas las categorías
app.get("/bikes/categories",(req,res)=>{
    db.query('SELECT * FROM categories;',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    }
    );
});

// Petición GET para obtener todas las marcas
app.get("/bikes/brands",(req,res)=>{
    db.query('SELECT * FROM brands;',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    }
    );
});

// Petición UPDATE para actualizar un producto
app.put("/update",(req,res)=>{
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const brand_id = req.body.brand_id;
    const category_id = req.body.category_id;
    const model_year = req.body.model_year;
    const list_price = req.body.list_price;
    
    const sqlUpdate = "UPDATE products SET product_name=?, brand_id=?, category_id=?, model_year=?, list_price=? WHERE product_id=?;";
    db.query(sqlUpdate,[product_name, brand_id, category_id, model_year, list_price, product_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Petición DELETE para eliminar un producto
app.delete("/delete/:product_id",(req,res)=>{
    const product_id = req.params.product_id;
    db.query("DELETE FROM products WHERE product_id = ?",product_id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Iniciar el servidor en el puerto 3001
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001...")
})