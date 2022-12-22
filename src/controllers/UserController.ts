import { Request, Response } from "express";
import Ad from "../models/Ad";
import Category from "../models/Category";
import State from "../models/State";
import User from "../models/User";
import { CategoryType } from "../types/CategoryType";
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
        const state = await State.findById(user.state) as StateType;
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
            state: state.name,
            ad: adList
        }
        res.json(data);
    },
    editAction: async (req: Request, res: Response) =>{
        /*const list = await State.
        res.json({ list });*/
    }    
}