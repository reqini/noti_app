import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, GlobalProvider } from './src/contexts';
import AppNavigator from './src/navigation/AppNavigator';
import './src/utils/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/utils/i18n';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <GlobalProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </GlobalProvider>
      <Toast />
    </I18nextProvider>
  );
}
