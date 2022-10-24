import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ticket from '../Ticket';
import { UserProvider } from '../../context/UserContext';

describe('Ticket test', () => {
  test('the whole ticket is rendering', async () => {
    render(<UserProvider><Ticket /></UserProvider>);
    const ticketElement = await screen.findByTestId('ticketBox');
    expect(ticketElement).toBeInTheDocument();
  });
  test('first part in ticket is rendering', async () => {
    render(<UserProvider><Ticket /></UserProvider>);
    const ticketElement = await screen.findByTestId('ticketBox1');
    expect(ticketElement).toBeInTheDocument();
  });
  test('second part in ticket is rendering', async () => {
    render(<UserProvider><Ticket /></UserProvider>);
    const ticketElement = await screen.findByTestId('ticketBox2');
    expect(ticketElement).toBeInTheDocument();
  });
  test('third part in ticket is rendering', async () => {
    render(<UserProvider><Ticket /></UserProvider>);
    const ticketElement = await screen.findByTestId('ticketBox3');
    expect(ticketElement).toBeInTheDocument();
  });
  test('button in ticket is rendering', async () => {
    render(<UserProvider><Ticket /></UserProvider>);
    const ticketElement = await screen.findByTestId('ticketButton');
    expect(ticketElement).toBeInTheDocument();
  });
});
