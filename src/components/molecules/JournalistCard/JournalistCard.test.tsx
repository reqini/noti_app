import React from 'react';
import { render } from '@testing-library/react-native';
import { JournalistCard } from '../JournalistCard';
import { Journalist } from '../../../contexts/GlobalContext';

describe('JournalistCard', () => {
  const journalist: Journalist = { id: 1, name: 'Test Journalist', email: 'test@example.com', phone: '123456789' };

  it('renders correctly', () => {
    const { getByText } = render(
      <JournalistCard journalist={journalist} onPress={() => {}} />
    );
    expect(getByText('Test Journalist')).toBeTruthy();
  });
}); 