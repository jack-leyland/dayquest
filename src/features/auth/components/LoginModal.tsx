import { Animated, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../common/constants/Colors";
import Layout from "../../../common/constants/Layout";
import GrowingBottomTray from "../../../common/components/GrowingBottomTray";
import {
  selectPreviousModalHeight,
  setDisplayedModal,
  setPreviousModalHeight,
} from "../authSlice";
import {
  ThonburiBold,
  ThonburiLight,
} from "../../../common/components/StyledText";
import AuthFormTextInputBox from "./AuthFormInputBox";
import { LoginFormStatus, LoginPayload } from "../types";
import validateEmail from "../../../common/util/validateEmail";

export default function LoginModal() {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [loginPayload, setLoginPayload] =
  useState<LoginPayload>({
    Id: null,
    type: "username",
    password: null,
    device: null
});
const [loginFormStatus, setLoginFormStatus] =
  useState<LoginFormStatus>({
    Id: {
      badInputText: "",
      isBadInput: false,
    },
    password: {
      criteria: [
        "Minimum 8 characters",
        "At least one uppercase character",
        "At least one lowercase character",
        "At least one number",
      ],
      isBadInput: false,
    },
  });

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

  const handleFormInput = (text: string, field: "Id" | "password") => {
    const update: LoginPayload = { ...loginPayload };
    update[field] = text;
    setLoginPayload(update);
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
              status={loginFormStatus.Id}
              isPassword={false}
              isEmail={true}
              onChange={(text)=> {handleFormInput(text,"Id")}}
            />
            <AuthFormTextInputBox
              topText={"Password"}
              status={loginFormStatus.password}
              isPassword={true}
              isEmail={false}
              onChange={(text)=> {handleFormInput(text,"password")}}
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
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>Sign In</Text>
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
