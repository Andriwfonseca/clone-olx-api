import { Request, Response } from "express";
import Category from "../models/Category";

export const CategoryController = {
    getCategories: async (req: Request, res: Response) =>{
        const cats: any = await Category.find();

        let categories = [];

        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }

        res.json({ categories });
    },
    getList: async (req: Request, res: Response) =>{
        /*const list = await Category.
        res.json({ list });*/
    },
    getItem: async (req: Request, res: Response) =>{
        /*const list = await Category.
        res.json({ list });*/
    },
    addAction: async (req: Request, res: Response) =>{
        /*const list = await Category.
        res.json({ list });*/
    },
    editAction: async (req: Request, res: Response) =>{
        /*const list = await Category.
        res.json({ list });*/
    }
}