import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Text, Icon } from '../../atoms';
import { useAuth } from '../../../contexts/AuthContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { StyleSheet, Dimensions } from 'react-native';

interface TopNavbarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showProfileButton?: boolean;
  onProfilePress?: () => void;
  showNotifications?: boolean;
  onNotificationPress?: () => void;
}

const LANGUAGES = [
  { code: 'es', label: '🇪🇸' },
  { code: 'en', label: '🇺🇸' },
  { code: 'pt', label: '🇧🇷' },
];

const TopNavbar: React.FC<TopNavbarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  showProfileButton = true,
  onProfilePress,
  showNotifications = true,
  onNotificationPress,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { i18n, t } = useTranslation();
  const [showLangs, setShowLangs] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLangs(false);
    
    // Mostrar toast de cambio de idioma
    Toast.show({
      type: 'success',
      text1: t('languageChanged'),
      text2: t(langCode === 'es' ? 'spanish' : langCode === 'en' ? 'english' : 'portuguese'),
      position: 'top',
      visibilityTime: 2000,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botón de retroceso */}
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress || (() => navigation.goBack())}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}

        {/* Título centrado y selector de idioma */}
        <View style={styles.titleContainer}>
          <Image source={require('../../../../assets/iso-logo.jpg')} style={{ width: 32, height: 32, marginRight: 8, resizeMode: 'contain' }} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.langSelectorContainer}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={() => setShowLangs(!showLangs)}
            activeOpacity={0.7}
          >
            <Text style={styles.langButtonText}>{LANGUAGES.find(l => l.code === i18n.language)?.label || '🌐'}</Text>
          </TouchableOpacity>
        </View>

        {/* Botones de la derecha */}
        <View style={styles.rightButtons}>
          {showNotifications && (
            <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
              <Icon name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          )}
          {showProfileButton && user && (
            <TouchableOpacity 
              style={styles.profileButton} 
              onPress={onProfilePress || (() => navigation.navigate('Profile' as never))}
            >
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
              ) : (
                <View style={[styles.profileAvatar, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }] }>
                  <Text style={{ fontSize: 16, color: '#888', fontWeight: 'bold' }}>{user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : ''}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Modal universal para selección de idioma */}
      <Modal
        visible={showLangs}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLangs(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowLangs(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, minWidth: 220, elevation: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>{t('selectLanguage')}</Text>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={{ paddingVertical: 12, alignItems: 'center' }}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Text style={{ fontSize: 16 }}>{lang.label} {t(lang.code === 'es' ? 'spanish' : lang.code === 'en' ? 'english' : 'portuguese')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default TopNavbar; 