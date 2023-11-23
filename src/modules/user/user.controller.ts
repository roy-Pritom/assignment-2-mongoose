/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userService } from "./user.service";
import userValidationSchema from "./user.validation";


const createUser = async (req: Request, res: Response) => {

    try {
        const userData = req.body;
        const { error,value } = userValidationSchema.validate(userData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Validation error',
                error: error,
            });
        }
        try{
        const result = await userService.createUserInToDb(value);
      
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }

}



const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUsersFromDb();
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

// Retrieve a specific user by ID
const getSingleUser = async (req: Request, res: Response) => {
    try {

        try {

            const { userId } = req.params;
            const result = await userService.getSingleUserFromDb(userId);
            res.status(200).json({
                success: true,
                message: "Users fetched successfully!",
                data: result
            })
            // when error occuere i service
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message || "User not found",
                error: err
            })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}



const updateUser = async (req: Request, res: Response) => {
    try {


        
        const { userId } = req.params;
        const userData = req.body;
        const { error,value } = userValidationSchema.validate(userData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Validation error',
                error: error,
            });
        }
        try {
            const result = await userService.updateUserInDb(userId, value)
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result
            })
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "User not found",
                error: error
            })
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}
const updateUserOrder = async (req: Request, res: Response) => {
    try {


        try {

            const { userId } = req.params;
            const userData = req.body;
            await userService.updateUserOrderInDb(userId, userData)
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null
            })
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "User not found",
                error: error
            })
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    try {


        try {

            const { userId } = req.params;

            const result = await userService.deleteUserFromDb(userId);
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: result
            })
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || "User not found",
                error: error
            })
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
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
    getSingleUser,
    updateUser,
    deleteUser,
    updateUserOrder,



}