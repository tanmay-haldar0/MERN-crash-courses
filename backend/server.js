import express from 'express';
import dotenv from 'dotenv'
import { connect_db } from './config/db.js';
import productRoutes from './routes/product_route.js';
import path from "path";

const app = express(); 
dotenv.config();

const PORT = process.env.PORT || 5000;

const _drname = path.resolve();

app.use(express.json());
 
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_drname, "/frontend/dist")));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(_drname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    connect_db();
    console.log("Server started at http://localhost:" + PORT); 
});  