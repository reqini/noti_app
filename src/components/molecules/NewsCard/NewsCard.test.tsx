import React from 'react';
import { render } from '@testing-library/react-native';
import { NewsCard } from '../NewsCard';
import { News } from '../../../contexts/GlobalContext';
import { GlobalProvider } from '../../../contexts/GlobalContext';

describe('NewsCard', () => {
  const news: News = {
    id: 1,
    title: 'Test News',
    content: 'Test content',
    image: 'https://example.com/image.jpg',
    publishedAt: '2023-01-01',
    journalistId: 1,
    journalist: { id: 1, name: 'Test Journalist', email: 'test@example.com', phone: '123456789' },
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <GlobalProvider>
        <NewsCard news={news} onPress={() => {}} />
      </GlobalProvider>
    );
    expect(getByText('Test News')).toBeTruthy();
    expect(getByText('Test content')).toBeTruthy();
    expect(getByText('Test Journalist')).toBeTruthy();
  });
}); 