import express from 'express';
import { userController } from './user.controller';

// create router
const router = express.Router();


// router
router.post('/api/users', userController.createUser)
router.get('/api/users', userController.getUsers)
router.get('/api/users/:userId', userController.getSingleUser)
router.get('/api/users/:userId/orders', userController.getOrdersBySpecificUser)
router.get('/api/users/:userId/orders/total-price', userController.getTotalPriceOfOrderBySpecificUser)
router.put('/api/users/:userId', userController.updateUser)
router.put('/api/users/:userId/orders', userController.updateUserOrder)
router.delete('/api/users/:userId', userController.deleteUser)


export const userRoutes = router;