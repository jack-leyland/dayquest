import {
  Animated,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../common/constants/Colors";
import Layout from "../../../common/constants/Layout";
import GrowingBottomTray from "../../../common/components/GrowingBottomTray";
import {
  disableAuthNavigator,
  overlayErrorModal,
  selectPreviousModalHeight,
  setAccessToken,
  setDisplayedModal,
  setPreviousModalHeight,
  setRefreshToken,
} from "../authSlice";
import {
  ThonburiBold,
  ThonburiLight,
} from "../../../common/components/StyledText";
import AuthFormTextInputBox from "./AuthFormInputBox";
import {
  FormStatus,
  LoginAPIResponse,
  LoginFormStatus,
  LoginPayload,
  PasswordFormStatus,
} from "../types";
import authServer from "../requests";

const defaultFormStatus = {
  id: {
    badInputText: "",
    isBadInput: false,
  },
  password: {
    criteria: ["Invalid Password"],
    isBadInput: false,
  },
};

export default function LoginModal() {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    id: null,
    password: null,
  });
  const [loginFormStatus, setLoginFormStatus] =
    useState<LoginFormStatus>(defaultFormStatus);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fade = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const modalHeight = Math.round(Layout.window.height * 0.6);
  const lastModalHeight = useSelector(selectPreviousModalHeight);

  const triggerFormRender = () => {
    setShowForm(true);
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleFormInput = (text: string, field: "id" | "password") => {
    const update: LoginPayload = { ...loginPayload };
    update[field] = text;
    if (!text) {
      const newStatus = {...loginFormStatus};
      newStatus[field] = {
        ...newStatus[field],
        isBadInput: false
      } as PasswordFormStatus & FormStatus
      setLoginFormStatus(newStatus)
    }
    setLoginPayload(update);
  };

  const validatePayload = (): boolean => {
    let valid = true;
    const newStatus = { ...loginFormStatus };

    for (const field in loginPayload) {
      if (loginPayload[field as keyof LoginPayload]) continue;

      if (field === "password") {
        newStatus.password = {
          ...newStatus.password,
          isBadInput: true,
        };
      } else {
        newStatus[field as keyof LoginPayload] = {
          badInputText: `Enter your ${
            field === "password" ? "password" : "email or username"
          }.`,
          isBadInput: true,
        } as PasswordFormStatus & FormStatus;
      }
      valid = false;
    }

    if (!valid) setLoginFormStatus(newStatus);
    return valid;
  };

  const submittButtonHandler = () => {
    if (!validatePayload()) return;
    setLoading(true);

    const sendPayload = async () => {
      try {
        const res = await authServer.post("/login", loginPayload);
        const data = res.data as LoginAPIResponse;
        console.log(data);
        if (data.success) {
          dispatch(setAccessToken(data.access));
          dispatch(setRefreshToken(data.refresh));
          dispatch(setPreviousModalHeight(modalHeight));
          dispatch(disableAuthNavigator());
          return;
        }

        const field = data.badField as keyof LoginFormStatus;
        const update = { ...loginFormStatus };
        update[field] = {
          badInputText: data.message,
          isBadInput: true,
        } as PasswordFormStatus & FormStatus;

        setLoginFormStatus(update);
      } catch (e) {
        console.log(e);
        setLoginFormStatus(defaultFormStatus);
        dispatch(overlayErrorModal(true));
      }
    };

    sendPayload();
    setLoading(false);
  };

  return (
    <GrowingBottomTray
      duration={100}
      from={lastModalHeight}
      to={modalHeight}
      onAnimationFinish={triggerFormRender}
    >
      {showForm && (
        <KeyboardAwareScrollView
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardShouldPersistTaps={"handled"}
        >
          <Animated.View style={{ ...styles.container, opacity: fade }}>
            <ThonburiBold style={styles.topText}>Sign In</ThonburiBold>
            <AuthFormTextInputBox
              topText={"Username or Email Address"}
              status={loginFormStatus.id}
              isPassword={false}
              isEmail={true}
              onChange={(text) => {
                handleFormInput(text, "id");
              }}
            />
            <AuthFormTextInputBox
              topText={"Password"}
              status={loginFormStatus.password}
              isPassword={true}
              isEmail={false}
              onChange={(text) => {
                handleFormInput(text, "password");
              }}
            />
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? "white"
                    : Colors.common.lightYellow,
                },
                styles.signUpButton,
              ]}
              onPress={submittButtonHandler}
            >
              {!isLoading ? (
                <Text style={styles.buttonText}>Sign In</Text>
              ) : (
                <ActivityIndicator size="large" color="black" />
              )}
            </Pressable>
            <ThonburiLight style={{ fontSize: 14 }}>
              I'm a new member.{" "}
              <ThonburiLight
                style={styles.linkText}
                onPress={() => {
                  dispatch(setDisplayedModal("register"));
                  dispatch(setPreviousModalHeight(modalHeight));
                }}
              >
                Sign Up
              </ThonburiLight>
            </ThonburiLight>
          </Animated.View>
        </KeyboardAwareScrollView>
      )}
    </GrowingBottomTray>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontSize: 20,
    marginTop: "10%",
    marginBottom: "10%",
  },
  signUpButton: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  buttonText: {
    color: Colors.light.text,
    fontFamily: "thonburi-bold",
    fontSize: 20,
  },
  linkText: {
    color: Colors.common.lightYellow,
    fontSize: 14,
  },
});
