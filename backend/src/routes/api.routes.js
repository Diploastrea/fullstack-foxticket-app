import express from 'express';
import cors from 'cors';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import {
  helloController,
  registerController,
  loginController,
  articleController,
  userController,
  shopController,
  newsController,
  orderController,
  ticketController,
} from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);

router.post('/login', loginController.loginUser);

router.post('/register', registerController.register);

router.get('/articles/:number', articleController.getArticles);

router.get('/products', verifyToken, shopController.getProducts);

router.put('/users', verifyToken, userController.modifyUser);

router.post('/admin/news', verifyToken, verifyAdmin, newsController.addNews);

router.delete('/admin/news/:id', verifyToken, verifyAdmin, newsController.deleteNews);

router.put('/admin/news/:id', verifyToken, verifyAdmin, newsController.modifyNews);

router.get('/orders/:userId', verifyToken, orderController.getOrders);

router.post('/orders/:userId', verifyToken, orderController.addOrder);

router.put('/orders/:userId', verifyToken, orderController.purchaseOrder);

router.delete('/orders', verifyToken, orderController.deleteAllOrders);

router.delete('/orders/:orderId', verifyToken, orderController.deleteOrderById);

router.get('/purchase/:purchaseId', verifyToken, ticketController.getTicket);

router.put('/purchase/:purchaseId', verifyToken, ticketController.activateTicket);

router.get('/purchases/inactive', verifyToken, ticketController.getInactiveTickets);

router.get('/purchases/active', verifyToken, ticketController.getActiveTickets);

export default router;
