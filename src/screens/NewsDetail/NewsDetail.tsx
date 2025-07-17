import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopNavbar from '../../components/organisms/TopNavbar';
import { useGlobal } from '../../contexts/GlobalContext';
import { apiService } from '../../services/api';
import { News } from '../../contexts/GlobalContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

interface RouteParams {
  newsId: number;
}

export const NewsDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { newsId } = route.params as RouteParams;
  const { state, addFavorite, removeFavorite, isFavorite } = useGlobal();
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewsDetail();
  }, [newsId, i18n.language]);

  const loadNewsDetail = async () => {
    try {
      setLoading(true);
      const newsData = await apiService.getNewsById(newsId);
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritePress = () => {
    if (news) {
      if (isFavorite(news.id)) {
        removeFavorite(news.id);
      } else {
        addFavorite(news.id);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('news')} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.container}>
        <TopNavbar title={t('news')} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff4757" />
          <Text style={styles.errorText}>{t('error')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbar title={t('news')} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Botón de volver atrás */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginBottom: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={{ marginLeft: 6, fontSize: 16, color: '#333' }}>Volver</Text>
        </TouchableOpacity>
        <Image source={{ uri: news.image }} style={styles.image} />
        
        <View style={styles.header}>
          <Text style={styles.title}>{news.title}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isFavorite(news.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite(news.id) ? '#ff4757' : '#666'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.metaInfo}>
          <View style={styles.journalistInfo}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.journalistName}>
              {news.journalist.name}
            </Text>
          </View>
          <Text style={styles.date}>
            {formatDate(news.publishedAt)}
          </Text>
        </View>

        <Text style={styles.articleContent}>{news.content}</Text>

        {/* Card del periodista eliminada */}
        {/*
        <View style={styles.journalistCard}>
          <View style={styles.journalistHeader}>
            <Ionicons name="person-circle" size={40} color="#007AFF" />
            <View style={styles.journalistDetails}>
              <Text style={styles.journalistTitle}>{t('journalists')}</Text>
              <Text style={styles.journalistFullName}>{news.journalist.name}</Text>
              <Text style={styles.journalistEmail}>{news.journalist.email}</Text>
              <Text style={styles.journalistPhone}>{news.journalist.phone}</Text>
            </View>
          </View>
        </View>
        */}
      </ScrollView>
    </View>
  );
}; 