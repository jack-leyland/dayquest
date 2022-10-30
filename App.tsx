import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import InitialView from './screens/InitialView';

//NOTE: InitialView will disable splash screen once background PNG has fully loaded.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const isDataLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isDataLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} />
        <StatusBar /> */}
        <InitialView />
      </SafeAreaProvider>
    );
  }
}
