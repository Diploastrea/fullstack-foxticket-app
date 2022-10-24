import { ticketService } from '../services';

export const ticketController = {
  async getTicket(req, res) {
    try {
      const ticket = await ticketService.getTicket(req);
      return res.status(200).json(ticket);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async activateTicket(req, res) {
    try {
      const ticket = await ticketService.activateTicket(req);
      return res.status(200).json(ticket);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getInactiveTickets(req, res) {
    try {
      const inactiveTickets = await ticketService.getInactiveTickets(req);
      return res.status(200).json(inactiveTickets);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getActiveTickets(req, res) {
    try {
      const activeTickets = await ticketService.getActiveTickets(req);
      return res.status(200).json(activeTickets);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
