import express from 'express';
import { userController } from './user.controller';


const router=express.Router();


// router
router.post('/api/users',userController.createUser)
router.get('/api/users',userController.getUsers)
router.get('/api/users/:userId',userController.getSingleUser)
router.put('/api/users/:userId',userController.updateUser)


export const userRoutes=router;