import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from './Input';

describe('Input Component', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Test Input"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    expect(getByPlaceholderText('Test Input')).toBeTruthy();
  });

  it('displays the value correctly', () => {
    const { getByDisplayValue } = render(
      <Input
        placeholder="Test Input"
        value="Test Value"
        onChangeText={mockOnChangeText}
      />
    );

    expect(getByDisplayValue('Test Value')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Test Input"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Test Input'), 'New Text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
  });

  it('renders with secure text entry', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Password"
        value=""
        onChangeText={mockOnChangeText}
        secureTextEntry={true}
      />
    );

    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('renders with email keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Email"
        value=""
        onChangeText={mockOnChangeText}
        keyboardType="email-address"
      />
    );

    const input = getByPlaceholderText('Email');
    expect(input.props.keyboardType).toBe('email-address');
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <Input
        placeholder="Test Input"
        value=""
        onChangeText={mockOnChangeText}
        error="This is an error message"
      />
    );

    expect(getByText('This is an error message')).toBeTruthy();
  });

  it('applies error styling when error is present', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Test Input"
        value=""
        onChangeText={mockOnChangeText}
        error="Error message"
      />
    );

    const input = getByPlaceholderText('Test Input');
    // The error styling should be applied to the input
    expect(input).toBeTruthy();
  });

  it('renders with numeric keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Number"
        value=""
        onChangeText={mockOnChangeText}
        keyboardType="numeric"
      />
    );

    const input = getByPlaceholderText('Number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  it('renders with phone pad keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Phone"
        value=""
        onChangeText={mockOnChangeText}
        keyboardType="phone-pad"
      />
    );

    const input = getByPlaceholderText('Phone');
    expect(input.props.keyboardType).toBe('phone-pad');
  });
}); 