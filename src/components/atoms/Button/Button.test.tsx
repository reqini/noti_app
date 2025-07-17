import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with primary variant by default', () => {
    const { getByText } = render(
      <Button title="Primary Button" onPress={mockOnPress} />
    );

    const button = getByText('Primary Button');
    expect(button).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    const { getByText } = render(
      <Button title="Secondary Button" onPress={mockOnPress} variant="secondary" />
    );

    expect(getByText('Secondary Button')).toBeTruthy();
  });

  it('renders with outline variant', () => {
    const { getByText } = render(
      <Button title="Outline Button" onPress={mockOnPress} variant="outline" />
    );

    expect(getByText('Outline Button')).toBeTruthy();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <Button title="Loading Button" onPress={mockOnPress} loading={true} />
    );

    // Note: You might need to add testID to the ActivityIndicator in the actual component
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = render(
      <Button title="Disabled Button" onPress={mockOnPress} disabled={true} />
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Loading Button" onPress={mockOnPress} loading />
    );
    fireEvent.press(getByTestId('loading-indicator'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
}); 