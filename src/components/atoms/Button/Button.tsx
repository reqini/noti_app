import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ButtonProps } from './types';
import { colors } from '../../../utils/styles';
import { buttonStyles } from './styles';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const buttonStyle = [
    buttonStyles.button,
    buttonStyles[variant],
    disabled && buttonStyles.disabled,
    style,
  ];

  const textStyle = [
    buttonStyles.text,
    buttonStyles[`${variant}Text`],
    disabled && buttonStyles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator testID="loading-indicator" />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};



export default Button; 