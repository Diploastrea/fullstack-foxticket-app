import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Tests regarding Login', () => {
  const history = createMemoryHistory();
  test('Check out the functionality of Button component, when there is no input', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>,
    );

    const loginButton = await screen.findByTestId('goToLanding');
    fireEvent.click(loginButton);
    await waitFor(() => screen.findByTestId('error_message'));
    const errorMessage = await screen.findByTestId('error_message');
    expect(errorMessage).toHaveTextContent('Please fill the email and the password too!');
  });
});
