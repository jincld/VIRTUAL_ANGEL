import express from 'express';
import dashboardController from '../controllers/dashboardController.js';

const router = express.Router();
router.get('/order', dashboardController.getSalesData);
router.get('/product', dashboardController.getCollectionData);

export default router;
