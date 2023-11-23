
export type FullName = {
    firstName: string;
    lastName: string;
};
export type Orders = {
    productName: string;
    price: number;
    quantity: number;
}[];

export type UserAddress = {
    street: string;
    city: string;
    country: string;
}

// User interface for user
export type User = {
    userId: number;
    username: string;
    password: string;
    fullName: FullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address:UserAddress;
    orders: Orders;
};
