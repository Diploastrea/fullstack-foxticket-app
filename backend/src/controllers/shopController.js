import { shopService } from '../services/shopService';

export const shopController = {
  async getProducts(req, res) {
    try {
      const shopProducts = await shopService.getProducts();
      res.status(200).json(shopProducts);
    } catch (error) {
      res.status(503).json({ error: error.message });
    }
  },
};
