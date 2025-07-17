import React from 'react';
import { render } from '@testing-library/react-native';
import TopNavbar from '../TopNavbar';
import { AuthProvider } from '../../../contexts/AuthContext';

describe('TopNavbar', () => {
  it('renders title', () => {
    const { getByText } = render(
      <AuthProvider>
        <TopNavbar title="Test Title" />
      </AuthProvider>
    );
    expect(getByText('Test Title')).toBeTruthy();
  });
}); 