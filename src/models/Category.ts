import { Schema, model, connection } from 'mongoose';

type CategoryType = {
    name: string,
    slug: string
}

const schema = new Schema<CategoryType>({
    name: { type: String, required: true } ,
    slug: String
}); 

const modelName = 'Category';

export default (connection && connection.models[modelName]) ? connection.models[modelName] : model<CategoryType>(modelName, schema);