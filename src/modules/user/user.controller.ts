/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userService } from "./user.service";
import { userValidationSchema } from "./user.validation";

// Create a new user
const createUser = async (req: Request, res: Response) => {

    try {
        const userData = req.body;
        const { error, value } = userValidationSchema.validate(userData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Validation error',
                error: error,
            });
        }
        try {
            const result = await userService.createUserInToDb(value);

            res.status(200).json({
                success: true,
                message: "User created successfully",
                data: result
            })
        } catch (err: any) {
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


//Retrieve a list of all users
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
        const id = Number(req.params.userId);
        try {


            const result = await userService.getSingleUserFromDb(id);
            res.status(200).json({
                success: true,
                message: "Users fetched successfully!",
                data: result
            })
            // when error occur in service
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message || "User not found",
                error: err
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}


//  Retrieve all orders for a specific user
const getOrdersBySpecificUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.userId);
        try {
            const result = await userService.getOrdersBySpecificUserFromDb(id);
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result
            })
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message || "User not found",
                error: err
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}

// Calculate Total Price of Orders for a Specific User
const getTotalPriceOfOrderBySpecificUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.userId);

        try {
            const result = await userService.getTotalPriceOfOrderBySpecificUserFromDb(id);
            res.status(200).json({
                success: true,
                message: result.length === 0 ? "Orders array is empty" : "Total price calculated successfully!",
                data: result.length === 0 ? "totalPrice=0" : result
            })
        } catch (err: any) {
            res.status(404).json({
                success: false,
                message: err.message || "User not found",
                error: err
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err
        })
    }
}


//Update user information
const updateUser = async (req: Request, res: Response) => {
    try {



        const id = Number(req.params.userId);
        const userData = req.body;
        const { error, value } = userValidationSchema.validate(userData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Validation error',
                error: error,
            });
        }
        try {
            const result = await userService.updateUserInDb(id, value)
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

// add order
const updateUserOrder = async (req: Request, res: Response) => {
    try {



        const id = Number(req.params.userId);
        const userData = req.body;

        try {

            await userService.updateUserOrderInDb(id, userData)
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

//Delete a user
const deleteUser = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.userId);
        try {


            const result = await userService.deleteUserFromDb(id);
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
    getOrdersBySpecificUser,
    getTotalPriceOfOrderBySpecificUser




}