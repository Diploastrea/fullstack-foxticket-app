import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import FormField from '../FormField';

describe('Tests regarding FormField', () => {
  test('We have the div, which contain the FormField itself', async () => {
    render(<FormField />);
    const divElement = await screen.findByTestId('formField');
    expect(divElement).toBeInTheDocument();
  });
  test('Trying out the onChange event with fake value', async () => {
    let newValue = null;
    render(<FormField onChange={(value) => { newValue = value; }} />);
    const textFieldElement = await screen.findByTestId(/content-input/i);
    fireEvent.change(textFieldElement.querySelector('input'), { target: { value: 'littlePea' } });
    expect(newValue).toBe('littlePea');
  });
});
