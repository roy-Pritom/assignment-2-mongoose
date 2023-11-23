import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};
export type TOrders = {
    productName: string;
    price: number;
    quantity: number;
};

export type TUserAddress = {
    street: string;
    city: string;
    country: string;
}

// User interface for user
export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address:TUserAddress;
    orders: TOrders[];
};

// static method
export interface UserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<TUser | null>;
  }