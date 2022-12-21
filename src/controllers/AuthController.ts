import { Request, Response } from "express";
import { matchedData } from "express-validator/src/matched-data";
import { validationResult } from "express-validator/src/validation-result";
import mongoose from "mongoose";
import State from "../models/State";
import User from "../models/User";
import bcrypt from "bcrypt";

export const signin = async (req: Request, res: Response) =>{
    /*const list = await Auth.
    res.json({ list });*/
}

export const signup = async (req: Request, res: Response) =>{
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        res.json({error: erros.mapped()});
        return;
    }

    const data = matchedData(req);

    //verificando se email ja existe
    const user = await User.findOne({
        email: data.email
    });

    if(user){
        res.json({
            error: {
                email: {
                    msg: 'E-mail já existe!'
                }
            } 
        });
        return;
    }

    //verificando se o codigo é valido
    if(mongoose.Types.ObjectId.isValid(data.state)){
        //verificando se estado existe
        const stateItem = await State.findById(data.state);
    
        if(!stateItem){
            res.json({
                error: {
                    state: {
                        msg: 'Estado não existe!'
                    }
                } 
            });
            return;
        }
    }else{
        res.json({
            error: {
                state: {
                    msg: 'Código de estado inválido!'
                }
            } 
        });
        return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
        name: data.name,
        email: data.email,
        passwordHash: passwordHash,
        token: token,
        state: data.state 
    });
    await newUser.save();

    res.json({token});
}

