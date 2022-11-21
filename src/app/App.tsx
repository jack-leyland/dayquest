import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { registerRootComponent } from 'expo'
import { Provider, useSelector } from 'react-redux'
import { useEffect } from 'react';

import useCachedResources from '../common/hooks/useCachedResources';
import useColorScheme from '../common/hooks/useColorScheme';
import Navigation from "../common/navigation"
import store from './store'
import { buildDatabase} from './db';

//NOTE: AuthScreen component will disable splash screen once background PNG has fully loaded.
SplashScreen.preventAutoHideAsync();

function App() {
  const isDataLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(()=> {
    buildDatabase()
  },[])

  // useEffect(()=> {
  //   if (lastUserid) {
  //     var getDaysArray = function(start: string, end: string) {
  //       for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
  //           arr.push(new Date(dt).toISOString());
  //       }
  //       return arr;
  //     };
    
  //     let dummyDates = getDaysArray("2022-11-01","2022-11-21")
      
  //     function getRandomInt(min:number, max:number) {
  //       min = Math.ceil(min);
  //       max = Math.floor(max);
  //       return Math.floor(Math.random() * (max - min + 1)) + min;
  //   }
  //     let db = openDB()
  //     for (const i in dummyDates) {
  //       let exp = getRandomInt(-200,400)
  //       console.log(lastUserid)
  //       db.transaction((tx)=> {
  //         tx.executeSql(`INSERT INTO expHistory VALUES (?,?,?)`,[lastUserid,dummyDates[i],exp])
  //       },(err)=> {
  //         console.log(err)
  //       })
  //     }
  //   }

  // },[lastUserid])

  if (!isDataLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar/>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default registerRootComponent(App)