import { Schema, model } from "mongoose";
import { TOrders, TUser,TUserAddress,TUserName } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] }
});

const userAddressSchema = new Schema<TUserAddress>({
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] }
});


const ordersSchema = new Schema<TOrders>({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

const userSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: userNameSchema,
        required: [true, 'Full name is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    isActive: {
        type: Boolean,
        required: [true, 'isActive is required'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
    },
    address: {
        type: userAddressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [ordersSchema],
        default: [],
    },
});

export const User=model<TUser>('Users',userSchema);