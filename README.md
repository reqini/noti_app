# Noti-app

Aplicación de noticias desarrollada en React Native + Expo.

## Requisitos
- Node.js >= 18
- npm >= 8
- Expo CLI (`npm install -g expo-cli`)

## Instalación
```sh
npm install
```

## Ejecución en desarrollo
```sh
npx expo start
```
Escaneá el QR con Expo Go (Android/iOS) o abrí en un emulador.

## Tests unitarios
```sh
npm test
```
Todos los tests deben pasar.

## Exportar APK instalable (Android)
1. Instalá EAS CLI si no la tenés:
   ```sh
   npm install -g eas-cli
   ```
2. Logueate en Expo:
   ```sh
   eas login
   ```
3. Ejecutá el build:
   ```sh
   eas build -p android --profile preview
   ```
   (o `--profile production` para release final)
4. Seguí el link que te da Expo para descargar el APK.

