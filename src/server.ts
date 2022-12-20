import express, { Request, Response } from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import { mongodbConnect } from './database/mongodb';
import apiRoutes from './routes/routes';

mongodbConnect();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'../public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () =>{
    console.log("Server rodando no endereço: ", process.env.BASE);
});