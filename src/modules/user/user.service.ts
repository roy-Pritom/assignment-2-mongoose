import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInToDb=async(user:TUser)=>{
   const result=await User.create(user);
   return result;
}


const getUsersFromDb=async()=>{
    const result=await User.find().select('username fullName age email address');
    return result;
}


export const userService={
    createUserInToDb,
    getUsersFromDb,
    

}