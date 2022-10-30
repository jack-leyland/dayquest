import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';
import { View as ThemedView } from '../components/Themed';
import LevelUpIcon from '../assets/noun-level-up.svg';
import Colors from '../constants/Colors';
import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function InitialView() {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeLoader = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.viewContainer}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.background}
        onLoad={() => {
          SplashScreen.hideAsync();
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
        }}
      >
        <View style={styles.content}>
          <Animated.View style={{ ...styles.logoContainer, opacity: fadeLogo }}>
            <Text style={styles.logoText}>DayQuest</Text>
            <View style={styles.sloganBox}>
              <Text style={styles.sloganText}>Level up your habits</Text>
              <LevelUpIcon width={40} height={40} fill={'#000000'} />
            </View>
          </Animated.View>
          <Animated.View style={{ ...styles.loader, opacity: fadeLoader }}>
            <ActivityIndicator size="large" color={'black'} />
            <Text style={styles.loaderText}>Checking in with the guild...</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
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
  content: {
    top: '33%',
  },
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  loaderText: {
    fontFamily: 'thonburi-light',
    marginLeft: 8,
  },
});
