/* eslint-disable react/jsx-no-constructed-context-values */
import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import ticketService from '../service/ticketService';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [inactiveTickets, setInactiveTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);
  const token = window.localStorage.getItem('token');
  let decoded = null;
  if (token) decoded = jwtDecode(token);
  const [user, setUser] = useState(decoded ?? null);

  if (user) {
    useEffect(() => {
      ticketService.getInactiveTickets().then((tickets) => setInactiveTickets(tickets));
      ticketService.getActiveTickets().then((tickets) => setActiveTickets(tickets));
    }, []);
  }

  function updateTickets() {
    ticketService.getInactiveTickets().then((tickets) => setInactiveTickets(tickets));
    ticketService.getActiveTickets().then((tickets) => setActiveTickets(tickets));
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      inactiveTickets,
      activeTickets,
      updateTickets,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}
