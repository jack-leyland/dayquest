import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  fetch as fetchNetInfo,
  NetInfoState,
} from '@react-native-community/netinfo';
import jwt from 'jwt-decode';

import LevelUpIcon from '../../../../assets/noun-level-up.svg';
import useLocalTokens from '../../../common/hooks/useLocalTokens';
import {
  renderErrorModal,
  selectActiveModal,
  setDisplayedModal,
} from '../authSlice';
import ActivityIndicatorLoader from '../../../common/components/ActivityIndicatorLoader';
import SignInPicker from '../components/SignInPicker';
import RegistrationModal from '../components/RegistrationModal';
import LoginModal from '../components/LoginModal';
import ErrorOverlay from '../components/ErrorOverlay';
import {
  setAccessToken,
  setActiveUser,
  setOfflineMode,
  setRefreshToken,
} from '../../../app/appSlice';
import useLastUserId from '../../../common/hooks/useLastUserId';
import { getUserRecord } from '../../../app/db';
import { JWT, User } from '../../../app/types';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../common/navigation/types';

export default function AuthScreen() {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeLoader = useRef(new Animated.Value(0)).current;
  const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const showErrorOverlay = useSelector(renderErrorModal);
  const lastUserId = useLastUserId();
  const lastUserTokens = useLocalTokens();
  const navigation = useNavigation<RootNavigationProps>();

  // When animation finishes, check who the most recently logged in user was and
  // fetch their record from the DB.
  useEffect(() => {
    if (isAnimationComplete) {
      if (!lastUserId) {
        dispatch(setDisplayedModal('picker'));
      } else {
        const fetchUserFromDb = async () => {
          try {
            const user = await getUserRecord(lastUserId);
            setUser(user);
          } catch (err) {
            console.log(err);
            //This means an SQL error. Send back to login screen.
            dispatch(setDisplayedModal('picker'));
          }
        };
        fetchUserFromDb();
      }
    }
  }, [isAnimationComplete]);

  // When the user record is loaded, check for offline user flag,
  // check that the stored tokens belong to the same user and then update appState and route accordingly.
  useEffect(() => {
    if (user) {
      dispatch(setActiveUser(user));
      if (user.isOfflineUser) {
        navigation.navigate('TabNavigator');
      } else {
        //If for whatever reason there aren't tokens in the keychain
        if (!lastUserTokens.access || !lastUserTokens.refresh) {
          dispatch(setDisplayedModal('picker'));
        } else {
          handleAppInitialization(user);
        }
      }
    }
  }, [user]);

  const handleAppInitialization = async (user: User) => {
    try {
      const connectionState: NetInfoState = await fetchNetInfo();
      if (!connectionState.isConnected) {
        //TODO: Modal Notifying user about what happends when you're offline?
        dispatch(setOfflineMode(true));
        navigation.navigate('TabNavigator');
      } else if (connectionState.isConnected) {
        const access: JWT = jwt(lastUserTokens.access as string);
        const refresh: JWT = jwt(lastUserTokens.refresh as string);
        if (
          access.user.userId != lastUserId ||
          refresh.user.userId != lastUserId
        ) {
          dispatch(setDisplayedModal('picker'));
        } else {
          dispatch(setAccessToken(lastUserTokens.access));
          dispatch(setRefreshToken(lastUserTokens.refresh));
          dispatch(setActiveUser(user));
          navigation.navigate('TabNavigator');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startAnimations = () => {
    Animated.timing(fadeLogo, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setAnimationComplete(true);
    });
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
          {showErrorOverlay && (
            <Modal transparent={true} animationType="fade">
              <ErrorOverlay />
            </Modal>
          )}
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
