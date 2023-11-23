import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInToDb = async (user: TUser) => {
    const result = await User.create(user);
    return result;
}


const getUsersFromDb = async () => {
    const result = await User.find().select('username fullName age email address');
    return result;
}

const getSingleUserFromDb = async (id: string) => {
    const existUser = await User.isUserExists(id);
    if (!existUser) {
        const error = new Error("User not found!");
        throw {
            code: 404,
            description: error.message

        };
    }
    const result = await User.findOne({ userId: id }, { password: false });
    return result;
}

export const userService = {
    createUserInToDb,
    getUsersFromDb,
    getSingleUserFromDb,



}