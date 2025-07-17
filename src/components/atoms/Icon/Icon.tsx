import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconProps } from './types';
import { colors } from '../../../utils/styles';
import { iconStyles } from './styles';

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.text,
  onPress,
  style,
}) => {
  const IconComponent = (
    <Ionicons name={name as any} size={size} color={color} style={style} testID="mock-icon" />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={iconStyles.touchable}>
        {IconComponent}
      </TouchableOpacity>
    );
  }

  return IconComponent;
};



export default Icon; 