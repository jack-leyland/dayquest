import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import LevelUpIcon from "../../../../assets/noun-level-up.svg";
import useLocalTokens from "../../../common/hooks/useLocalUserData";
import {
  disableAuthNavigator,
  selectActiveModal,
  setDisplayedModal,
} from "../authSlice";
import ActivityIndicatorLoader from "../../../common/components/ActivityIndicatorLoader";
import SignInPicker from "../components/SignInPicker";
import RegistrationModal from "../components/RegistrationModal";
import LoginModal from "../components/LoginModal";

export default function AuthScreen() {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeLoader = useRef(new Animated.Value(0)).current;
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const lastUserTokens = useLocalTokens();
  useEffect(() => {
    if (isAnimationComplete) {
      if (!lastUserTokens.access || !lastUserTokens.refresh) {
        dispatch(setDisplayedModal("picker"));
      } else {
        dispatch(disableAuthNavigator());
      }
    }
  }, [isAnimationComplete]);

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
          source={require("../../../../assets/images/splash.png")}
          style={styles.background}
          onLoad={() => {
            SplashScreen.hideAsync();
            startAnimations();
          }}
        >
          <Animated.View style={{ ...styles.logoContainer, opacity: fadeLogo }}>
            <Text style={styles.logoText}>DayQuest</Text>
            <View style={styles.sloganBox}>
              <Text style={styles.sloganText}>Level up your habits</Text>
              <LevelUpIcon width={40} height={40} fill={"#000000"} />
            </View>
          </Animated.View>
          {activeModal === "login" && <LoginModal />}
          {activeModal === "register" && <RegistrationModal />}
          {activeModal === "picker" && <SignInPicker />}
          {activeModal === "loader" && (
            <ActivityIndicatorLoader
              viewStyle={{ ...styles.loader, opacity: fadeLoader }}
              text={"Checking in with the guild..."}
              textStyle={styles.loaderText}
              indicatorColor={"black"}
              indicatorSize={"large"}
            />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  viewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    maxHeight: "80%",
  },
  sloganBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 80,
    fontFamily: "euphoria",
    width: "100%",
    textAlign: "center",
  },
  sloganText: {
    fontFamily: "thonburi-light",
    fontSize: 18,
    marginLeft: 14,
  },
  loader: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  loaderText: {
    fontFamily: "thonburi-light",
    marginLeft: 8,
  },
});
