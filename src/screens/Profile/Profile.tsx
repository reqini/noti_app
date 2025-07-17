import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobal } from '../../contexts/GlobalContext';
import { NewsCard } from '../../components/molecules/NewsCard';
import { News } from '../../contexts/GlobalContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

export const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { state } = useGlobal();
  const { t } = useTranslation();

  const [favoritesExpanded, setFavoritesExpanded] = useState(false); // cerrado por defecto
  const [settingsExpanded, setSettingsExpanded] = useState(true);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  const handleUpdateProfile = async () => {
    await updateProfile({ name });
    Toast.show({
      type: 'success',
      text1: t('account'),
      text2: t('Datos actualizados correctamente'),
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleNewsPress = (news: News) => {
    // Navigate to news detail
    console.log('News pressed:', news.title);
  };

  const renderFavoriteItem = ({ item }: { item: News }) => (
    <NewsCard news={item} onPress={() => handleNewsPress(item)} />
  );

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      await updateProfile({ avatar: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {user?.avatar ? (
            <TouchableOpacity onPress={handlePickAvatar} style={{ position: 'relative' }}>
              <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
              <View style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, padding: 4 }}>
                <Ionicons name="pencil" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePickAvatar} style={[styles.profileAvatar, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', position: 'relative' }] }>
              <Text style={{ fontSize: 28, color: '#888', fontWeight: 'bold' }}>{getInitials(user?.name || '')}</Text>
              <View style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, padding: 4 }}>
                <Ionicons name="pencil" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          )}
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.name}>{user?.name || t('welcome')}</Text>
            <Text style={styles.email}>{user?.email || 'usuario@example.com'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Inputs editables para nombre y clave, ahora desplegable */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setSettingsExpanded(!settingsExpanded)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="settings-outline" size={24} color="#666" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>{t('settings')}</Text>
            <Ionicons name={settingsExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#333" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          {settingsExpanded && (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('name')}
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder={t('password')}
                secureTextEntry
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
                <Text style={styles.saveButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Favoritos al final, en una sola columna */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setFavoritesExpanded(!favoritesExpanded)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="heart" size={24} color="#ff4757" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>{t('favorites')}</Text>
            <Ionicons name={favoritesExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#333" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          {favoritesExpanded && (
            state.favorites.length > 0 ? (
              <FlatList
                data={state.favorites}
                renderItem={({ item }) => (
                  <NewsCard news={item} onPress={() => {}} compact />
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyFavorites}>
                <Ionicons name="heart-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>
                  {t('emptyFavorites')}
                </Text>
                <Text style={styles.emptySubtext}>
                  {t('addToFavorites')}
                </Text>
              </View>
            )
          )}
        </View>
        {/* Botón de cerrar sesión al final */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ff4757" />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </View>
  );
}; 