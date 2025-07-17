import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { InputProps } from './types';
import { colors } from '../../../utils/styles';
import { inputStyles } from './styles';
import { Ionicons } from '@expo/vector-icons';

const Input: React.FC<InputProps & { showToggleEye?: boolean; isPasswordValid?: boolean; onToggleEye?: () => void; showPassword?: boolean }> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  showToggleEye = false,
  isPasswordValid,
  onToggleEye,
  showPassword,
}) => {
  return (
    <View style={inputStyles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={[
            inputStyles.input,
            error && inputStyles.inputError,
            isPasswordValid === false && { borderColor: colors.error },
            isPasswordValid === true && { borderColor: colors.success },
            { flex: 1 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {showToggleEye && (
          <TouchableOpacity onPress={onToggleEye} style={{ marginLeft: 8 }} testID="toggle-eye">
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={inputStyles.errorText}>{error}</Text>}
    </View>
  );
};



export default Input; 