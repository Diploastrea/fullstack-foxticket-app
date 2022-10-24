/* eslint-disable no-await-in-loop */
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { Ticket } from '../models/Ticket';
import { db } from '../data/connection';

export async function verifyProduct(productId) {
  const product = await Product.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) throw Error("Product doesn't exists.");
}

export async function createOrder(userId, productId) {
  await Order.create({
    userId,
    productId,
  });
  const order = await Order.findOne({
    attributes: ['id', 'status', 'orderDate', 'productId'],
    where: {
      userId,
      productId,
    },
    order: [['id', 'DESC']],
  });
  return order;
}

export async function getPendingOrders(userId) {
  const pendingOrders = await db.query(
    `SELECT orders.id, orders.status, orders.orderDate, products.name, products.price 
    FROM orders 
    INNER JOIN products ON products.id = orders.productId 
    WHERE orders.userId = ?
    AND orders.status = 'pending'`,
    {
      replacements: [userId],
      type: db.QueryTypes.SELECT,
    },
  );
  return pendingOrders;
}

export async function payOrder(userId) {
  const paidOrder = await getPendingOrders(userId);
  await Order.update({
    status: 'paid',
  }, {
    where: {
      userId,
    },
  });
  const createTickets = async () => {
    for (let i = 0; i < paidOrder.length; i += 1) {
      const ticket = paidOrder[i];
      await Ticket.create({
        id: ticket.id,
        productName: ticket.name,
        userId,
      });
    }
  };
  await createTickets();
  const purchases = await Ticket.findAll({
    limit: paidOrder.length,
    attributes: { exclude: ['userId'] },
    where: {
      userId,
    },
    order: [['id', 'DESC']],
  });
  return purchases;
}

export async function deleteOrder(orderId) {
  const orderExists = await Order.findByPk(orderId);
  if (!orderExists) return 'Order with given ID does not exists.';
  await Order.destroy({
    where: {
      id: orderId,
    },
  });
  return 'Order deleted successfully.';
}

export async function deleteOrders(userId) {
  await Order.destroy({
    where: {
      userId,
      status: 'pending',
    },
  });
}

export const orderService = {
  async addOrder(req) {
    const { userId } = req.params;
    const { productId } = req.body;
    if (!productId) throw Error('Product ID is required.');
    await verifyProduct(productId);
    const order = await createOrder(userId, productId);
    return order;
  },

  async getOrders(req) {
    const { userId } = req.params;
    const pendingOrders = await getPendingOrders(userId);
    if (pendingOrders.length === 0) throw Error('There is no pending order.');
    return pendingOrders;
  },

  async purchaseOrder(req) {
    const { userId } = req.params;
    const purchases = await payOrder(userId);
    return purchases;
  },

  async deleteOrderById(req) {
    const { orderId } = req.params;
    const response = await deleteOrder(orderId);
    return { status: response };
  },

  async deleteAllOrders(req) {
    const { id } = req.headers.user;
    await deleteOrders(id);
    return { status: 'Orders deleted successfully.' };
  },
};
