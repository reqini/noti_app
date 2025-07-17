import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopNavbar from '../../components/organisms/TopNavbar';
import { NewsCard } from '../../components/molecules/NewsCard';
import { useGlobal } from '../../contexts/GlobalContext';
import { apiService } from '../../services/api';
import { News } from '../../contexts/GlobalContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useGlobal();
  const { t, i18n } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadNews = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const news = await apiService.getNews();
      dispatch({ type: 'SET_NEWS', payload: news });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: t('errorLoadingNews') });
      console.error('Error loading news:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  useEffect(() => {
    loadNews();
  }, [i18n.language]);

  const filteredNews = state.news.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.journalist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewsPress = (news: News) => {
    (navigation as any).navigate('NewsDetail', { newsId: news.id });
  };

  const renderNewsItem = ({ item }: { item: News }) => (
    <NewsCard news={item} onPress={() => handleNewsPress(item)} fullImage />
  );

  if (state.loading && !refreshing) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('news')} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>{t('loadingNews')}</Text>
        </View>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('news')} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff4757" />
          <Text style={styles.errorText}>{state.error}</Text>
          <Text style={styles.retryText} onPress={loadNews}>
            {t('tryAgain')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbar title={t('news')} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#333', padding: 0, backgroundColor: 'transparent' }}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            testID="search-input"
          />
        </View>
      </View>

      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="newspaper-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchQuery ? t('noNewsFound') : t('noNews')}
            </Text>
          </View>
        }
      />
    </View>
  );
}; 