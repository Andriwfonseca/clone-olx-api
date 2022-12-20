import { Schema, model, connection, Model } from 'mongoose';

type StateType = {
    name: string
}

const schema = new Schema<StateType>({
    name: { type: String, required: true } 
}); 

const modelName = 'State';

const stateModel = connection && connection.models[modelName] ? (connection.models[modelName] as Model<StateType>) : model<StateType>(modelName, schema)

export default stateModel;