import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";
import { orderValidationSchema } from "./user.validation";

const createUserInToDb = async (user: TUser) => {
    const result = await User.create(user);
    return result;
}


const getUsersFromDb = async () => {
    const result = await User.find().select('username fullName age email address');
    return result;
}

const getSingleUserFromDb = async (id: string) => {
    await User.isUserExists(id);
    const result = await User.findOne({ userId: id }, { password: false });
    return result;
}

// Retrieve all orders for a specific user
const getOrdersBySpecificUserFromDb = async (id:string) => {
    // call static method
     await User.isUserExists(id);
     const result=await User.findOne({userId:id},{orders:1});
     return result;
}


const updateUserInDb = async (id: string, user: TUser) => {
    // call static method
    await User.isUserExists(id);
    const result = await User.findOneAndUpdate({ userId: id }, user, { new: true, projection: { password: 0 } });
    return result;
}

const updateUserOrderInDb = async (id: string, newItem: TOrders) => {
    // call static method
    await User.isUserExists(id);
    const { error, value } = orderValidationSchema.validate(newItem);
    if (error) {
        throw new Error("orders item  must be TOrders type.")
    }
    const result = await User.findOneAndUpdate(
        { userId: id },
        { $push: { orders: value } }
    )

    return result;
}

const deleteUserFromDb = async (id: string) => {
    // call static method
    await User.isUserExists(id);
    const result = await User.deleteOne({ userId: id });
    return result;
}

export const userService = {
    createUserInToDb,
    getUsersFromDb,
    getSingleUserFromDb,
    updateUserInDb,
    deleteUserFromDb,
    updateUserOrderInDb,
    getOrdersBySpecificUserFromDb,





}