import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import Card from './Card';

describe('Card Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );

    expect(getByText('Card Content')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <Card onPress={mockOnPress}>
        <Text>Pressable Card</Text>
      </Card>
    );

    fireEvent.press(getByText('Pressable Card'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders without onPress as a View', () => {
    const { getByText } = render(
      <Card>
        <Text>Non-pressable Card</Text>
      </Card>
    );

    expect(getByText('Non-pressable Card')).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Card style={customStyle}>
        <Text>Styled Card</Text>
      </Card>
    );

    const card = getByText('Styled Card').parent;
    expect(card).toBeTruthy();
  });

  it('renders multiple children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </Card>
    );

    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });

  it('handles complex children structure', () => {
    const { getByText } = render(
      <Card>
        <View>
          <Text>Nested Content</Text>
        </View>
      </Card>
    );

    expect(getByText('Nested Content')).toBeTruthy();
  });
}); 