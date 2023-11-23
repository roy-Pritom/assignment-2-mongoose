import express from 'express';
import { userController } from './user.controller';


const router=express.Router();


// router
router.post('/users',userController.createUser)
router.get('/users',userController.getUsers)
router.get('/users/:userId',userController.getSingleUser)


export const userRoutes=router;