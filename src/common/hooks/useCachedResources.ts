import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
 
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'euphoria': require('../../../assets/fonts/EuphoriaScript-Regular.ttf'),
          'thonburi-regular': require('../../../assets/fonts/Thonburi-Regular.ttf'),
          'thonburi-bold': require('../../../assets/fonts/Thonburi-Bold.ttf'),
          'thonburi-light': require('../../../assets/fonts/Thonburi-Light.ttf'),
        });


      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
