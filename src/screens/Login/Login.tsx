import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Text } from '../../components/atoms';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { login, register, isLoading } = useAuth();
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setErrorMsg('');
    setSuccessMsg('');
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (isRegister) {
      if (!name.trim()) newErrors.name = 'El nombre es requerido';
    }
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }
    if (isRegister) {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!validateForm()) return;
    const ok = await login(email, password);
    if (!ok) {
      setErrorMsg('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };

  const handleRegister = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!validateForm()) return;
    const res = await register(name, email, password);
    if (res.success) {
      setSuccessMsg('¡Registro exitoso! Ya puedes usar la app.');
      setTimeout(() => setIsRegister(false), 1000);
    } else {
      setErrorMsg(res.error || 'Error al registrar');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isRegister ? '#e0f7fa' : '#f8f9fa' }]}> 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.header}>
              <Image source={require('../../../assets/logo.jpg')} style={{ width: 200, height: 120, marginBottom: 16, resizeMode: 'contain' }} />
              <Text style={[styles.title, { color: isRegister ? '#00796b' : '#007AFF' }]}>{t('welcome')}</Text>
              <Text style={[styles.subtitle, { color: isRegister ? '#00796b' : '#666' }] }>
                {isRegister ? t('register') + ' para comenzar' : t('login') + ' para continuar'}
              </Text>
            </View>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}
            {successMsg ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>{successMsg}</Text>
              </View>
            ) : null}

            <View style={[styles.form, { backgroundColor: isRegister ? '#b2ebf2' : '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }] }>
              {isRegister && (
                <Input
                  placeholder={t('name')}
                  value={name}
                  onChangeText={setName}
                  error={errors.name}
                />
              )}
              <Input
                placeholder={t('email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={errors.email}
              />
              <Input
                placeholder={t('password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
                showToggleEye={true}
                showPassword={showPassword}
                onToggleEye={() => setShowPassword((prev) => !prev)}
                isPasswordValid={isRegister ? password.length >= 6 : undefined}
              />
              {isRegister && (
                <Input
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  error={errors.confirmPassword}
                  showToggleEye={true}
                  showPassword={showConfirmPassword}
                  onToggleEye={() => setShowConfirmPassword((prev) => !prev)}
                  isPasswordValid={isRegister ? confirmPassword.length >= 6 && password === confirmPassword : undefined}
                />
              )}

              <Button
                title={isRegister ? t('register') : t('login')}
                onPress={isRegister ? handleRegister : handleLogin}
                loading={isLoading}
                style={[styles.loginButton, { backgroundColor: isRegister ? '#00796b' : '#007AFF' }]}
              />
            </View>

            <TouchableOpacity
              style={[styles.switchModeBtn, { backgroundColor: isRegister ? '#007AFF' : '#00796b' }]}
              onPress={() => {
                setIsRegister(!isRegister);
                resetForm();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.switchModeText}>
                {isRegister ? t('login') : t('register')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login; 