import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CardProps } from './types';
import { cardStyles } from './styles';

const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent
      style={[cardStyles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </CardComponent>
  );
};



export default Card; 