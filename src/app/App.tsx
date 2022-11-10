import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { registerRootComponent } from 'expo'
import { Provider } from 'react-redux'
import { useEffect } from 'react';

import useCachedResources from '../common/hooks/useCachedResources';
import useColorScheme from '../common/hooks/useColorScheme';
import Navigation from "../common/navigation"
import store from './store'
import { buildDatabase } from './db';


//NOTE: InitialView will disable splash screen once background PNG has fully loaded.
SplashScreen.preventAutoHideAsync();

function App() {
  const isDataLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(()=> {
    buildDatabase()
  },[])




  if (!isDataLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
        </Provider>
        <StatusBar style={colorScheme}/>
      </SafeAreaProvider>
    );
  }
}

export default registerRootComponent(App)