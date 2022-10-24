import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Shop from '../Shop';

describe('Shop tests:', () => {
  test('Tabs in shop are rendering', async () => {
    render(<Shop />);
    const shopElement = await screen.findByTestId('tabs');
    expect(shopElement).toBeInTheDocument();
  });
  test('First tab in shop is rendering', async () => {
    render(<Shop />);
    const firstTabElement = await screen.findByTestId('firstTab');
    expect(firstTabElement).toBeInTheDocument();
  });
  test('Second tab in shop is rendering', async () => {
    render(<Shop />);
    const secondTabElement = await screen.findByTestId('secondTab');
    expect(secondTabElement).toBeInTheDocument();
  });
  test('Box for items rendering exists', async () => {
    render(<Shop />);
    const boxForTicketsElement = await screen.findByTestId('boxForTickets');
    expect(boxForTicketsElement).toBeInTheDocument();
  });
});
