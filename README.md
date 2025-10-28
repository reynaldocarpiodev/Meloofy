# Meloofy 🎵

Una aplicación móvil que transforma sonidos en melodías musicales usando inteligencia artificial.

## Guía rápida

```bash
git clone <repository-url>
cd meloofy
npm install    # o npm ci si quieres instalaciones 100% reproducibles
npx expo start # abre el dev server y muestra el QR
# Alternativas:
# npm run android   # Abre en emulador/dispositivo Android
# npm run ios       # Abre en simulador iOS (macOS)
# npm run web       # Versión web
```

## Características

- **Pantalla de Inicio**: Bienvenida y navegación principal
- **Subir Audio**: Selecciona archivos de audio para generar melodías
- **Mi Música**: Biblioteca personal de melodías generadas
- **Contacto**: Información de contacto y soporte

## Tecnologías Utilizadas

- React Native
- Expo
- React Navigation
- Expo AV (para reproducción de audio)
- Expo Document Picker (para selección de archivos)
- Expo Linear Gradient (para efectos visuales)

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y npm 10+ (recomendado)
- Expo Go en tu dispositivo móvil (desde la tienda)
- Android Studio (opcional, solo si usarás emulador Android)
- Xcode (opcional, solo en macOS para simulador iOS)

### Pasos de Instalación

1) **Clonar el repositorio**
```bash
git clone <repository-url>
cd meloofy
```

2) **Instalar dependencias**
```bash
npm install
# o (para instalaciones reproducibles usando package-lock.json)
npm ci
```

3) **Iniciar el servidor de desarrollo**
```bash
npx expo start
# También puedes usar los scripts:
# npm start | npm run android | npm run ios | npm run web
```

4) **Abrir la app**
- En tu móvil, abre Expo Go y escanea el QR que aparece en la terminal o en la ventana de Expo.
- En emulador, usa `npm run android` o `npm run ios`.

## Estructura del Proyecto

```
meloofy/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── UploadScreen.js
│   │   ├── MyMusicScreen.js
│   │   └── ContactScreen.js
│   └── navigation/
│       └── TabNavigator.js
├── assets/
├── App.js
├── app.json
└── package.json
```

## Funcionalidades Implementadas

### ✅ Pantalla de Inicio
- Diseño atractivo con gradientes
- Navegación a otras pantallas
- Información sobre la app

### ✅ Pantalla de Subida
- Selección de archivos de audio
- Previsualización de archivos
- Simulación de procesamiento IA
- Instrucciones claras para el usuario

### ✅ Mi Música
- Lista de melodías generadas (datos de ejemplo)
- Reproducción de melodías
- Opciones para compartir y eliminar
- Estado vacío cuando no hay melodías

### ✅ Contacto
- Formulario de contacto
- Información de la empresa
- Enlaces a redes sociales
- Integración con email y enlaces externos

## Próximas Funcionalidades

- [ ] Integración real con API de IA para generación de melodías
- [ ] Grabación de audio desde la app
- [ ] Exportación de melodías en diferentes formatos
- [ ] Sistema de usuarios y autenticación
- [ ] Compartir melodías en redes sociales
- [ ] Efectos y filtros adicionales
- [ ] Modo offline

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en navegador web

## Uso de la App (paso a paso)

1. **Inicio**: desde la pantalla principal, navega con la barra inferior.
2. **Subir Audio**: elige un archivo de audio desde tu dispositivo para procesarlo.
3. **Mi Música**: reproduce tus melodías, pausa/reanuda y gestiona tu lista.
4. **Contacto**: envía consultas y revisa los enlaces de soporte.

## Permisos Requeridos

### Android
- `RECORD_AUDIO` - Para grabación de audio
- `READ_EXTERNAL_STORAGE` - Para leer archivos de audio
- `WRITE_EXTERNAL_STORAGE` - Para guardar melodías generadas

### iOS
- Acceso al micrófono para grabación
- Acceso a la biblioteca de medios

## Soporte

Para soporte técnico o preguntas:
- Email: support@meloofy.com
- Horario: Lun - Vie, 9:00 AM - 6:00 PM

## Solución de Problemas

- **Limpiar caché de Metro/Expo**
  ```bash
  npx expo start -c
  ```
- **Instalación corrupta** (vuelve a instalar dependencias)
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  # En Windows (PowerShell):
  # rmdir /S /Q node_modules; del package-lock.json; npm install
  ```
- **Puerto ocupado**: cierra servidores previos o reinicia la terminal.
- **Android no conecta**: habilita Depuración por USB y usa un cable de datos; ejecuta `adb devices` para verificar.
- **Expo Go desactualizado**: actualiza la app Expo Go a la última versión.

## Licencia

© 2024 Meloofy. Todos los derechos reservados.