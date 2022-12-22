import { Schema, model, connection, Model } from 'mongoose';

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

const User = connection && connection.models[modelName] ? (connection.models[modelName] as Model<UserType>) : model<UserType>(modelName, schema)

export default User;