import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
import { Product } from '../models/Product';
import { db } from '../data/connection';

export async function getTicketById(purchaseId) {
  const {
    userId,
    productName,
    status,
    paidDate,
    expirationDate,
  } = await Ticket.findByPk(purchaseId);
  const { name, email } = await User.findByPk(userId);
  const { type, duration } = await Product.findOne({
    where: {
      name: productName,
    },
  });
  const ticket = {
    user: {
      name,
      email,
    },
    product: {
      name: productName,
      duration,
      type,
      status,
      paidDate,
      expirationDate,
    },
  };
  return ticket;
}

export async function activate(purchaseId) {
  const inactiveTicket = await Ticket.findByPk(purchaseId);
  const product = await Product.findOne({
    where: {
      name: inactiveTicket.productName,
    },
  });
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + (product.duration / 24));
  await Ticket.update({
    status: 'active',
    expirationDate,
  }, {
    where: {
      id: purchaseId,
    },
  });
  const ticket = await db.query(
    `SELECT tickets.id, status, paidDate, expirationDate, products.id AS productId
    FROM tickets 
    JOIN products ON productName = products.name
    WHERE tickets.id = ?`,
    {
      replacements: [purchaseId],
      type: db.QueryTypes.SELECT,
    },
  );
  return ticket;
}

export async function inactiveTickets(userId) {
  const tickets = await db.query(
    `SELECT tickets.id, productName, products.description, products.duration
    FROM tickets 
    JOIN products ON productName = products.name
    WHERE tickets.userId = ?
    AND status = 'not active'
    ORDER BY tickets.id`,
    {
      replacements: [userId],
      type: db.QueryTypes.SELECT,
    },
  );
  return tickets;
}

export async function activeTickets(userId) {
  const tickets = await db.query(
    `SELECT tickets.id, productName, products.description, expirationDate
    FROM tickets 
    JOIN products ON productName = products.name
    WHERE tickets.userId = ?
    AND status = 'active'
    ORDER BY tickets.id`,
    {
      replacements: [userId],
      type: db.QueryTypes.SELECT,
    },
  );
  return tickets;
}

export const ticketService = {
  async getTicket(req) {
    const { purchaseId } = req.params;
    const ticket = await getTicketById(purchaseId);
    return ticket;
  },

  async activateTicket(req) {
    const { purchaseId } = req.params;
    const ticket = await activate(purchaseId);
    return ticket;
  },

  async getInactiveTickets(req) {
    const { id } = req.headers.user;
    const tickets = await inactiveTickets(id);
    return tickets;
  },

  async getActiveTickets(req) {
    const { id } = req.headers.user;
    const tickets = await activeTickets(id);
    return tickets;
  },
};
