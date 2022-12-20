import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongodbConnect =async () => {
    try {
        await connect(process.env.DATABASE as string);
        console.log("Mongodb conectado com sucesso!");
    } catch (error) {
        console.log("Erro Conexão Mongodb: ", error);
    }
}