import { Schema, model, connection, Model } from 'mongoose';
import { StateType } from '../types/StateType';

const schema = new Schema<StateType>({
    name: { type: String, required: true } 
}); 

const modelName = 'State';

const State = connection && connection.models[modelName] ? (connection.models[modelName] as Model<StateType>) : model<StateType>(modelName, schema)

export default State;