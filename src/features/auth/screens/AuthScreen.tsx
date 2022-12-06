import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  fetch as fetchNetInfo,
  NetInfoState,
} from '@react-native-community/netinfo';

import LevelUpIcon from '../../../../assets/noun-level-up.svg';
import { selectActiveModal, setDisplayedModal } from '../authSlice';
import ActivityIndicatorLoader from '../../../common/components/ActivityIndicatorLoader';
import SignInPicker from '../components/SignInPicker';
import RegistrationModal from '../components/RegistrationModal';
import LoginModal from '../components/LoginModal';
import {
  setAccessToken,
  setActiveUser,
  setOfflineMode,
  setRefreshToken,
} from '../../../app/appSlice';
import { userDbProxy } from '../../../app/db';
import { User } from '../../../app/types';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../common/navigation/types';
import { clearLocalStorage } from '../util/clearLocalStorage';
import { verifyUser } from '../util/verifyUser';
import { fetchLocalUserData } from '../util/fetchLocalUserData';

export default function AuthScreen() {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeLoader = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const navigation = useNavigation<RootNavigationProps>(); 

  useEffect(() => {

      const redirectOnLoggedInUser = async () => {
        try {
          const localUserData = await fetchLocalUserData()
          const successfulVerification = await verifyUser(localUserData)
          if (successfulVerification) {
            const user: User = await userDbProxy.getUserRecord(localUserData.userId as string);
            console.log("succesful verification")
            dispatch(setActiveUser(user));
  
            if (user.isOfflineUser) {
              dispatch(setDisplayedModal('picker'));
              return
            } 
    
            dispatch(setAccessToken(localUserData.access));
            dispatch(setRefreshToken(localUserData.refresh));
    
            // Set initial connection state
            try {
              const connectionState: NetInfoState = await fetchNetInfo();
              dispatch(setOfflineMode(!connectionState.isConnected))
            } catch (err) {
              dispatch(setOfflineMode(true))
            }

            navigation.navigate('TabNavigator');
          } else {
            clearLocalStorage()
            dispatch(setDisplayedModal('picker'));
          }
          

        } catch (err) {
          clearLocalStorage()
          dispatch(setDisplayedModal('picker'));
        }
        
      }
      redirectOnLoggedInUser()
  }, []);

  const startAnimations = () => {
    Animated.timing(fadeLogo, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeLoader, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.viewContainer}>
        <ImageBackground
          source={require('../../../../assets/images/splash.png')}
          style={styles.background}
          onLoad={() => {
            const hideSplash = async () => {
              await SplashScreen.hideAsync();
            };
            hideSplash();
            startAnimations();
          }}
        >
          <Animated.View style={{ ...styles.logoContainer, opacity: fadeLogo }}>
            <Text style={styles.logoText}>DayQuest</Text>
            <View style={styles.sloganBox}>
              <Text style={styles.sloganText}>Level up your habits</Text>
              <LevelUpIcon width={40} height={40} fill={'#000000'} />
            </View>
          </Animated.View>
          {activeModal === 'login' && <LoginModal />}
          {activeModal === 'register' && <RegistrationModal />}
          {activeModal === 'picker' && <SignInPicker />}
          {activeModal === 'loader' && (
            <ActivityIndicatorLoader
              viewStyle={{ ...styles.loader, opacity: fadeLoader }}
              text={'Checking in with the guild...'}
              textStyle={styles.loaderText}
              indicatorColor={'black'}
              indicatorSize={'large'}
            />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    maxHeight: '80%',
  },
  sloganBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 80,
    fontFamily: 'euphoria',
    width: '100%',
    textAlign: 'center',
  },
  sloganText: {
    fontFamily: 'thonburi-light',
    fontSize: 18,
    marginLeft: 14,
  },
  loader: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loaderText: {
    fontFamily: 'thonburi-light',
    marginLeft: 8,
  },
});
