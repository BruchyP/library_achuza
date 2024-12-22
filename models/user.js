import { Schema, model } from "mongoose";

const userSchema = Schema({
    password: String,
    email: String,
    username: String,
    phone: String,
    fine: { type: Number, default: 0 }
})

export const userModel = model("user", userSchema);