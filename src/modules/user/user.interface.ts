
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
