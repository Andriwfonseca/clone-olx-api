import express, { Request, Response } from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import { mongodbConnect } from './database/mongodb';

mongodbConnect();

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'../public'));

server.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true});
});

server.listen(process.env.PORT, () =>{
    console.log("Server rodando no endereço: ", process.env.BASE);
});