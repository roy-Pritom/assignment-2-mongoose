import express from 'express';
import { userController } from './user.controller';


const router=express.Router();


// router
router.post('/users',userController.createUser)


export const userRoutes=router;