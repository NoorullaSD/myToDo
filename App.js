import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useEffect } from 'react';
import NotificationService from './src/service/notificationService'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const init = async () => {

      await NotificationService.requestPermission();

      const token =
        await NotificationService.getFCMToken();

      console.log(token);

      NotificationService.foregroundListener();

      NotificationService.backgroundHandler();
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
