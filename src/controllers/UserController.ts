import { Request, Response } from "express";
import State from "../models/State";

export const UserController = {
    getStates: async (req: Request, res: Response) =>{
        const states = await State.find({});
        res.json({ states });
    },
    getInfo: async (req: Request, res: Response) =>{
        /*const list = await State.
        res.json({ list });*/
    },
    editAction: async (req: Request, res: Response) =>{
        /*const list = await State.
        res.json({ list });*/
    }    
}