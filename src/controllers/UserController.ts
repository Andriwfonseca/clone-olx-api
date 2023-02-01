import { Request, Response } from "express";
import { matchedData } from "express-validator/src/matched-data";
import { validationResult } from "express-validator/src/validation-result";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Ad from "../models/Ad";
import Category from "../models/Category";
import State from "../models/State";
import User from "../models/User";
import { CategoryType } from "../types/CategoryType";
import { EditUserType } from "../types/EditUserType";
import { StateType } from "../types/StateType";
import { UserType } from "../types/UserType";

export const UserController = {
    getStates: async (req: Request, res: Response) =>{
        const states = await State.find({});
        res.json({ states });
    },
    getInfo: async (req: Request, res: Response) =>{
        let token = req.query.token;

        const user = await User.findOne({token: token}) as UserType;

        if(user){
            //se o usuario nao tem state cadastrado, deixa em branco
            const state = (!mongoose.Types.ObjectId.isValid(user.state)) ? "" 
            : await State.findById(user.state) as StateType;

            const ad = await Ad.find({idUser: user._id.toString()});
            let adList: any = [];

            for(let i in ad){        
                const cat = await Category.findById(ad[i].category) as CategoryType;
            
                //adiciona o ad inteiro na lista, mas só altera o category para cat.slug
                adList.push({...ad[i], category: cat.slug});
            }
            
            const data = {
                name: user.name,
                email: user.email,
                state: (state) ? state.name : "",
                ad: adList
            }
            res.json(data);       
        }else{
            res.status(400);
            res.json({error: 'Token inválido'});
        }  
    },
    editAction: async (req: Request, res: Response) =>{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
    
        const data = matchedData(req);

        let updates:EditUserType = {};

        if(data.name){
            updates.name = data.name;
        }

        if(data.email){
            const emailCheck = await User.findOne({email: data.email});
            if(emailCheck){
                res.json({error: 'E-mail já existente!'});
                return;
            }

            updates.email = data.email;
        }

        

        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){
                
                const stateCheck = await State.findById(data.state) as StateType;
                
                if(!stateCheck){
                    res.json({error: 'Estado não existente!'});
                    return;
                }
    
                updates.state = data.state;
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
        }

        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates});

        res.json({});
    }    
}