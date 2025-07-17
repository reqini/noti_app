import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Icon from './Icon';

// Eliminar el mock de Ionicons

describe('Icon Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Icon name="heart" />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { getByTestId } = render(
      <Icon name="heart" size={32} />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with custom color', () => {
    const { getByTestId } = render(
      <Icon name="heart" color="red" />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Icon name="heart" onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('mock-icon'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders without onPress as a simple icon', () => {
    const { getByTestId } = render(
      <Icon name="heart" />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with custom style', () => {
    const { getByTestId } = render(
      <Icon name="heart" style={{ margin: 10 }} />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders different icon names', () => {
    const { getByTestId } = render(
      <Icon name="star" />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with all props combined', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Icon name="settings" size={40} color="blue" style={{ margin: 5 }} onPress={mockOnPress} />
    );

    expect(getByTestId('mock-icon')).toBeTruthy();
  });
}); 