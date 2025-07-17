import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './types';
import { colors } from '../../../utils/styles';
import { textStyles } from './styles';

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = colors.text,
  style,
  numberOfLines,
}) => {
  return (
    <RNText style={[textStyles[variant], { color }, style]} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};



export default Text; 