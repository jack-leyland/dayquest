import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  fetch as fetchNetInfo,
  NetInfoState,
} from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"

import { selectActiveModal, setDisplayedModal } from "../authSlice";
import ActivityIndicatorLoader from "../../../common/components/ActivityIndicatorLoader";
import SignInPicker from "../components/SignInPicker";
import RegistrationModal from "../components/RegistrationModal";
import LoginModal from "../components/LoginModal";
import {
  setActiveUser,
  setOfflineMode
} from "../../../app/appSlice";
import { userDbProxy } from "../../../app/db";
import { GetUserAPIReponse, User} from "../../../common/types";

import { RootNavigationProps } from "../../../common/navigation/types";
import { clearLocalStorage } from "../../../common/util/clearLocalStorage";
import { verifyUser } from "../util/verifyUser";
import userServer from "../../../app/userServer";
import { fetchLocalUserData } from "../../../common/util/fetchLocalUserData";
import { AppInitConfig } from "../types";
import FadeInLogo from "../components/AnimatedLogo";

export default function AuthScreen() {
  const fadeLoader = useRef(new Animated.Value(0)).current;
  
  const [shouldNavigateHome, setNavigateHome] = useState<boolean|null>(null)
  const [showLogo, setShowLogo] = useState<boolean>(false)
  const [splashScreenDismissed, setSplashScreenDismissed] = useState<boolean>(false)

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const navigation = useNavigation<RootNavigationProps>();

  useEffect(() => {
    const getInitConfig = async (): Promise<AppInitConfig>  => {
      let result: AppInitConfig = {
        navigateHome: false,
        clearLocalStorage: false,
        offlineMode: false,
        deactivateUser: false,
        offlineUser: false, // reserved for future functionality
        user: null
      }
      try {
        const localUserData = await fetchLocalUserData();
        const successfulVerification = await verifyUser(localUserData);

        if (!successfulVerification) {
          return result;
        }

        const user: User = await userDbProxy.getUserRecord(
          localUserData.userId as string
        );
        result.user = user

        // Set initial connection state
        try {
          const connectionState: NetInfoState = await fetchNetInfo();

          //if connected, ask API if the user has been deleted from another device
          if (connectionState.isConnected) {
            try {
              const res = await userServer.get(`/${user.userId}`);
              const isActive = (res.data as GetUserAPIReponse).exists;

              if (isActive) {
                dispatch(setOfflineMode(false));
              } else {
                result.clearLocalStorage = true
                result.deactivateUser = true
                return result;
              }
            } catch (err) {
              // Allow offline use in the case of network error contacting server
              if (axios.isAxiosError(err) && !err.response) {
                result.offlineMode = true
              } else {
                console.log(err);
                result.clearLocalStorage = true
                return result;
              }
            }
          } else {
            result.offlineMode = true
          }
        } catch (err) {
          console.log(err);
          result.offlineMode = true
        }
        result.navigateHome = true
        return result
      } catch (err) {
        console.log(err);
        result.clearLocalStorage = true
        return result
      }
    };

    const runInitSequence = async () => {
      const initConfig: AppInitConfig = await getInitConfig()

      if (initConfig.clearLocalStorage) clearLocalStorage()
      if (initConfig.user && initConfig.deactivateUser) {
        userDbProxy.setUserInactive(initConfig.user.userId)
      }
      if (!initConfig.navigateHome) dispatch(setDisplayedModal("picker"))
      dispatch(setOfflineMode(initConfig.offlineMode))
      dispatch(setActiveUser(initConfig.user))
      setNavigateHome(initConfig.navigateHome)
    }
    runInitSequence()

  }, []);

  useEffect(()=> {
    if (navigation && splashScreenDismissed) {
      if (shouldNavigateHome === false) {
        clearLocalStorage();
        dispatch(setDisplayedModal("picker")); 
      } else if (shouldNavigateHome === true) {
        navigation.navigate("TabNavigator")
      }
    }
  }, [navigation, shouldNavigateHome, splashScreenDismissed])



  const startAnimations = () => {
    setShowLogo(true)
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
            const hideSplash = async () => {
              await SplashScreen.hideAsync();
              setSplashScreenDismissed(true)
            };
            hideSplash();
            startAnimations();
          }}
        >
          {showLogo && <FadeInLogo fadeDuration={500} />}
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
