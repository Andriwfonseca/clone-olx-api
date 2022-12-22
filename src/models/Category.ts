import { Schema, model, connection, Model } from 'mongoose';
import { CategoryType } from '../types/CategoryType';

const schema = new Schema<CategoryType>({
    name: { type: String, required: true } ,
    slug: String
}); 

const modelName = 'Category';

const Category = connection && connection.models[modelName] ? (connection.models[modelName] as Model<CategoryType>) : model<CategoryType>(modelName, schema)

export default Category;