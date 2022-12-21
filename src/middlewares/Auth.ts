import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.query.token && !req.body.token){
        res.json({notallowed: true});
        return;
    }

    let token = '';
    if(req.query.token){
        token = req.query.token as string;
    }else if(req.body.token){
        token = req.body.token;
    }

    if(token = ""){
        res.json({notallowed: true});
        return;
    }

    const user = await User.findOne({
        token: token
    });

    if(!user){
        res.json({notallowed: true});
        return;
    }

    next();
}