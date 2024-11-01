// config/mongoConnect.ts
import mongoose from "mongoose";
import {MONGO_URL} from "./env.ts"


export const mongoConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Something went wrong in Database Connection:', err);
    }
};
