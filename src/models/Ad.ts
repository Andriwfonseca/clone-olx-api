import { Schema, model, connection } from 'mongoose';

type AdType = {
    idUser: string,
    state: string,
    category: string,
    images: [{}],
    dateCreated: Date,
    title: string,
    price: number,
    priceNegociable: boolean,
    description: string,
    views: number,
    status: string
}

const schema = new Schema<AdType>({
    idUser: { type: String, required: true } ,
    state: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [Object], required: true },
    dateCreated: { type: Date, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    priceNegociable: Boolean,
    description: { type: String, required: true },
    views: Number,
    status: { type: String, required: true },
}); 

const modelName = 'Ad';

export default (connection && connection.models[modelName]) ? connection.models[modelName] : model<AdType>(modelName, schema);