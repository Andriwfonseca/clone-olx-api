import { Request, Response } from "express";
import State from "../models/State";

export const getStates = async (req: Request, res: Response) =>{
    const states = await State.find({});
    res.json({ states });
}

export const getInfo = async (req: Request, res: Response) =>{
    /*const list = await State.
    res.json({ list });*/
}

export const editAction = async (req: Request, res: Response) =>{
    /*const list = await State.
    res.json({ list });*/
}
