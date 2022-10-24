import { orderService } from '../services';

export const orderController = {
  async addOrder(req, res) {
    try {
      const newOrder = await orderService.addOrder(req);
      return res.status(200).json(newOrder);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getOrders(req, res) {
    try {
      const pendingOrders = await orderService.getOrders(req);
      return res.status(200).json(pendingOrders);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async purchaseOrder(req, res) {
    try {
      const purchases = await orderService.purchaseOrder(req);
      return res.status(200).json(purchases);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async deleteOrderById(req, res) {
    try {
      const response = await orderService.deleteOrderById(req);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteAllOrders(req, res) {
    try {
      const response = await orderService.deleteAllOrders(req);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
