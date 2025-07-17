import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopNavbar from '../../components/organisms/TopNavbar';
import { JournalistCard } from '../../components/molecules/JournalistCard';
import { useGlobal } from '../../contexts/GlobalContext';
import { apiService } from '../../services/api';
import { Journalist } from '../../contexts/GlobalContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

export const Journalists: React.FC = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useGlobal();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const loadJournalists = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const journalists = await apiService.getJournalists();
      dispatch({ type: 'SET_JOURNALISTS', payload: journalists });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: t('errorLoadingNews') });
      console.error('Error loading journalists:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJournalists();
    setRefreshing(false);
  };

  useEffect(() => {
    loadJournalists();
  }, []);

  const handleJournalistPress = (journalist: Journalist) => {
    // Navigate to journalist detail or show more info
    console.log('Journalist pressed:', journalist.name);
  };

  const renderJournalistItem = ({ item }: { item: Journalist }) => (
    <JournalistCard journalist={item} onPress={() => handleJournalistPress(item)} />
  );

  if (state.loading && !refreshing) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('journalists')} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('journalists')} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff4757" />
          <Text style={styles.errorText}>{state.error}</Text>
          <Text style={styles.retryText} onPress={loadJournalists}>
            {t('tryAgain')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbar title={t('journalists')} />
      
      <FlatList
        data={state.journalists}
        renderItem={renderJournalistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {t('noNews')}
            </Text>
          </View>
        }
      />
    </View>
  );
}; 