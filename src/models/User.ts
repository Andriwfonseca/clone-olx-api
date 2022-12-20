import { Schema, model, connection } from 'mongoose';

type UserType = {
    name: string,
    email: string,
    state: string,
    passwordHash: string,
    token: string
}

const schema = new Schema<UserType>({
    name: { type: String, required: true } ,
    email: { type: String, required: true },
    state: { type: String, required: true },
    passwordHash: { type: String, required: true },
    token: String
}); 

const modelName = 'User';

export default (connection && connection.models[modelName]) ? connection.models[modelName] : model<UserType>(modelName, schema);