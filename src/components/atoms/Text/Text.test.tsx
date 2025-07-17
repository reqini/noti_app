import React from 'react';
import { render } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';
import Text from './Text';

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Text>Default Text</Text>
    );

    expect(getByText('Default Text')).toBeTruthy();
  });

  it('renders with h1 variant', () => {
    const { getByText } = render(
      <Text variant="h1">Heading 1</Text>
    );

    expect(getByText('Heading 1')).toBeTruthy();
  });

  it('renders with h2 variant', () => {
    const { getByText } = render(
      <Text variant="h2">Heading 2</Text>
    );

    expect(getByText('Heading 2')).toBeTruthy();
  });

  it('renders with h3 variant', () => {
    const { getByText } = render(
      <Text variant="h3">Heading 3</Text>
    );

    expect(getByText('Heading 3')).toBeTruthy();
  });

  it('renders with body variant', () => {
    const { getByText } = render(
      <Text variant="body">Body Text</Text>
    );

    expect(getByText('Body Text')).toBeTruthy();
  });

  it('renders with caption variant', () => {
    const { getByText } = render(
      <Text variant="caption">Caption Text</Text>
    );

    expect(getByText('Caption Text')).toBeTruthy();
  });

  it('renders with label variant', () => {
    const { getByText } = render(
      <Text variant="label">Label Text</Text>
    );

    expect(getByText('Label Text')).toBeTruthy();
  });

  it('applies custom color', () => {
    const { getByText } = render(
      <Text color="#FF0000">Red Text</Text>
    );

    expect(getByText('Red Text')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByText } = render(
      <Text style={{ fontWeight: 'bold' }}>Bold Text</Text>
    );

    expect(getByText('Bold Text')).toBeTruthy();
  });

  it('renders with numberOfLines prop', () => {
    const { getByText } = render(
      <Text numberOfLines={2}>Long text that should be truncated</Text>
    );

    expect(getByText('Long text that should be truncated')).toBeTruthy();
  });

  it('renders nested content correctly', () => {
    const { getByText } = render(
      <Text>
        <RNText>Nested</RNText> Content
      </Text>
    );

    expect(getByText('Nested Content')).toBeTruthy();
  });

  it('renders with multiple children', () => {
    const { getByText } = render(
      <Text>
        <RNText>First</RNText>
        <RNText>Second</RNText>
      </Text>
    );

    expect(getByText('FirstSecond')).toBeTruthy();
  });
}); 