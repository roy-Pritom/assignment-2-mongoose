import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {

    try {
        const userData = req.body;
        const result = await userService.createUserInToDb(userData);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }

}



const getUsers = async(req: Request, res: Response) => {
    try {
        const result=await userService.getUsersFromDb();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}


export const userController = {
    createUser,
    getUsers,

}