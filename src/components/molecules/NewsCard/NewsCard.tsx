import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { News, useGlobal } from '../../../contexts/GlobalContext';
import { styles } from './styles';

interface NewsCardProps {
  news: News;
  onPress: () => void;
  compact?: boolean;
  fullImage?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onPress, compact, fullImage }) => {
  const { isFavorite, addFavorite, removeFavorite } = useGlobal();
  const isFavorited = isFavorite(news.id);

  const handleFavoritePress = () => {
    if (isFavorited) {
      removeFavorite(news.id);
    } else {
      addFavorite(news.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: news.image }} style={fullImage ? styles.fullImage : styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {news.title}
          </Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorited ? '#ff4757' : '#666'}
            />
          </TouchableOpacity>
        </View>
        {!compact && (
          <>
            <Text style={styles.contentText} numberOfLines={3}>
              {news.content}
            </Text>
            <View style={styles.footer}>
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
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}; 