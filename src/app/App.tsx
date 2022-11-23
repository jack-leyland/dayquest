import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { registerRootComponent } from 'expo';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useCachedResources from '../common/hooks/useCachedResources';
import useColorScheme from '../common/hooks/useColorScheme';
import Navigation from '../common/navigation';
import store from './store';
import { buildDatabase } from './db';

//NOTE: AuthScreen component will disable splash screen once background PNG has fully loaded.
SplashScreen.preventAutoHideAsync();

function App() {
  const isDataLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    buildDatabase();
  }, []);

  if (!isDataLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default registerRootComponent(App);
