import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Registration from '../Registration';

describe('Rendering the components of the registration page', () => {
  const history = createMemoryHistory();
  test('The title of the page is rendered', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const titleElement = screen.getByText(/FoxTicket/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('The registration button rendered', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const buttonElement = screen.getByText(/Registration/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test('The error container is rendered', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const alertElement = await screen.findByTestId('errorContainer');
    expect(alertElement).toBeInTheDocument();
  });
  test('The form container is rendered', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const formContainerElement = screen.getByTestId('formContainer');
    expect(formContainerElement).toBeInTheDocument();
  });
  test('Link for navigate to the login page is rendered', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const linkElement = screen.getByText('If you already have an account, click here to login');

    expect(linkElement).toBeInTheDocument();
  });
});

describe('Testing the content of the rendered components', () => {
  const history = createMemoryHistory();
  test('The title of the page is correct', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const titleElement = screen.getByText('FoxTicket');
    expect(titleElement.textContent).toEqual('FoxTicket');
  });
});

describe('Testing the validation of the registration', () => {
  const history = createMemoryHistory();
  test('The text is changing in the email input field', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const inputElement = await screen.findByLabelText(/Username/i);
    fireEvent.change(inputElement, { target: { value: 'Type here your username' } });
    expect(inputElement.value).toBe('Type here your username');
  });
  test('The username input field is not empty when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const inputElement = await screen.findByLabelText(/Username/i);
    const buttonElement = screen.getByRole('button', { name: /Registration/i });
    fireEvent.change(inputElement, { target: { value: 'Username' } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe('Username');
  });
  test('The email input field is not empty when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const inputElement = await screen.findByLabelText(/Email/i);
    const buttonElement = screen.getByRole('button', { name: /Registration/i });
    fireEvent.change(inputElement, { target: { value: 'Email' } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe('Email');
  });
  test('The email, username, password input fields are empty when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const buttonElement = screen.getByTestId('registrationBtn');
    fireEvent.click(buttonElement);
    await waitFor(() => {
      screen.getByTestId('alertText');
    });
    const alertElement = await screen.findByTestId('alertText');
    expect(alertElement.textContent).toEqual('Name, email and password are required.');
  });
  test('The username is empty when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const buttonElement = screen.findByRole('button', { dataTestid: /registrationBtn/i });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Levi' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/password again/i), { target: { value: '12345678' } });

    fireEvent.click(await buttonElement);
    await waitFor(async () => {
      screen.getByTestId('alertText');
    });
    const alertElement = await screen.findByTestId('alertText');
    expect(alertElement.textContent).toEqual('Email is required');
  });
  test('The email is empty when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const buttonElement = screen.findByRole('button', { dataTestid: /registrationBtn/i });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'valami@valami.hu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/password again/i), { target: { value: '12345678' } });

    fireEvent.click(await buttonElement);
    await waitFor(async () => {
      screen.getByTestId('alertText');
    });
    const alertElement = await screen.findByTestId('alertText');
    expect(alertElement.textContent).toEqual('Username is required');
  });
  test('The password are not the same when submitting the form', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );
    const buttonElement = screen.findByRole('button', { dataTestid: /registrationBtn/i });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'valami' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'valami@valami.hu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'P@ssw0rd1' } });
    fireEvent.change(screen.getByLabelText(/password again/i), { target: { value: 'P@ssw0rd' } });

    fireEvent.click(await buttonElement);
    await waitFor(async () => {
      screen.getByTestId('alertText');
    });
    const alertElement = await screen.findByTestId('alertText');
    expect(alertElement.textContent).toEqual('The passwords are not the same, please check them again!');
  });
  test('Testing the fetch call with correct data', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });
    global.fetch = mockFetch;
    render(
      <Router location={history.location} navigator={history}>
        <Registration />
      </Router>,
    );

    const buttonElement = screen.findByRole('button', { dataTestid: /registrationBtn/i });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Levi' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'valami@valami.hu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'P@ssw0rd' } });
    fireEvent.change(screen.getByLabelText(/password again/i), { target: { value: 'P@ssw0rd' } });
    fireEvent.click(await buttonElement);

    expect(mockFetch).toBeCalledTimes(1);
    const body = JSON.stringify({
      name: 'Levi',
      email: 'valami@valami.hu',
      password: 'P@ssw0rd',
    });
    expect(mockFetch).toBeCalledWith(`${process.env.REACT_APP_URL}/api/register`, { body, headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, method: 'POST' });
  });
});
