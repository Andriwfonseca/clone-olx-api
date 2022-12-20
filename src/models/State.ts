import { Schema, model, connection } from 'mongoose';

type StateType = {
    name: string
}

const schema = new Schema<StateType>({
    name: { type: String, required: true } 
}); 

const modelName = 'State';

export default (connection && connection.models[modelName]) ? connection.models[modelName] : model<StateType>(modelName, schema);