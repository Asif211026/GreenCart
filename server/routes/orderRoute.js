import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrder, getUSerOrder, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/user', authUser, getUSerOrder)
orderRouter.get('/seller', authSeller,getAllOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;