import { Schema, model } from "mongoose";
import { TOrders, TUser, TUserAddress, TUserName, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../app/config";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    }
});

const userAddressSchema = new Schema<TUserAddress>({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    }
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

const userSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        unique: true,
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

    },
});

// static method
userSchema.statics.isUserExists = async function (id: number) {
    const existUser = await User.findOne({ userId: id })
    if (!existUser) {
        const error = new Error("User not found!");
        throw {
            code: 404,
            description: error.message

        };
    }
    return existUser;
}

// pre save middleware
userSchema.pre('save', async function (next) {
    // hashing password
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
})

// post save middleware
userSchema.post('save', function (doc, next) {
    doc.password ='';
    next();
})


export const User = model<TUser, UserModel>('Users', userSchema);