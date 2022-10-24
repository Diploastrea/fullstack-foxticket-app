import { Product } from '../models/Product';

export const shopService = {
  async getProducts() {
    const products = await Product.findAll();
    if (!products[0]) {
      throw Error('There are no available products right now.');
    }
    return products;
  },
};
