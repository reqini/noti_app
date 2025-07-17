import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
import { Journalist } from '../../../contexts/GlobalContext';
import { styles } from './styles';

interface JournalistCardProps {
  journalist: Journalist;
  onPress: () => void;
}

export const JournalistCard: React.FC<JournalistCardProps> = ({ journalist, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="#fff" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{journalist.name}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{journalist.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{journalist.phone}</Text>
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );
}; 