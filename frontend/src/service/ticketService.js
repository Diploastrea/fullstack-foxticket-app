const ticketService = {
  async activateTicket(purchaseId) {
    try {
      await fetch(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return 'Ticket activated successfully';
    } catch (err) {
      return err;
    }
  },

  async getTicketById(purchaseId) {
    try {
      const data = await fetch(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const ticket = await data.json();
      return ticket;
    } catch (err) {
      return err;
    }
  },

  async getInactiveTickets() {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/purchases/inactive`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const inactiveTickets = await response.json();
      return inactiveTickets;
    } catch (err) {
      return err;
    }
  },

  async getActiveTickets() {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/purchases/active`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const activeTickets = await response.json();
      return activeTickets;
    } catch (err) {
      return err;
    }
  },
};

export default ticketService;
