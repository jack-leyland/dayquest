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
import validateEmail from "../../../common/util/validateEmail";
import { RegistrationFormStatus, RegistrationPayload } from "../types";

export default function RegistrationModal() {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [registrationPayload, setRegistrationPayload] =
    useState<RegistrationPayload>({
      email: null,
      username: null,
      password: null,
      device: null
  });
  const [registrationFormStatus, setRegistrationFormStatus] =
    useState<RegistrationFormStatus>({
      email: {
        badInputText: "",
        isBadInput: false,
      },
      username: {
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
  const modalHeight = Math.round(Layout.window.height * 0.7);
  const lastModalHeight = useSelector(selectPreviousModalHeight);

  const triggerFormRender = () => {
    setShowForm(true);
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleFormInput = (text: string, field: keyof RegistrationPayload) => {
    const update: RegistrationPayload = { ...registrationPayload };
    update[field] = text;
    setRegistrationPayload(update);
  };

  const emailValidator = (email: string) => {
    const valid = validateEmail(email);
    const update = {...registrationFormStatus};
    if (!email || valid) {
      update.email = {
          isBadInput: false,
          badInputText: "",
        },
      setRegistrationFormStatus(update);
    } else {
      update.email = {
          isBadInput: true,
          badInputText: "Please enter a valid email address",
        },
      setRegistrationFormStatus(update);
    }
  };

  const passwordValidator = (pw: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const valid = regex.test(pw);
    const update = { ...registrationFormStatus };
    if (!pw || valid) {
      update.password = {
        ...update.password,
        isBadInput: false
      };
      setRegistrationFormStatus(update);
    } else {
      update.password = {
        ...update.password,
        isBadInput: true
      };
      setRegistrationFormStatus(update);
    }
  };


  const usernameValidator = (username: string) => {
    const valid = validateEmail(username);
    const update = {...registrationFormStatus};
    if (!username || !valid) {
      update.username = {
        ...update.username,
        isBadInput: false
      };
      setRegistrationFormStatus(update);
    } else {
      update.username = {
        badInputText: "Your username can't be an email!",
        isBadInput: true
      };
      setRegistrationFormStatus(update);
    }
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
            <ThonburiBold style={styles.topText}>Create Account</ThonburiBold>
            <AuthFormTextInputBox
              topText={"Email Address"}
              onChange={(text: string) => {
                handleFormInput(text, "email");
              }}
              status={registrationFormStatus.email}
              isPassword={false}
              isEmail={true}
              validator={emailValidator}
            />
            <AuthFormTextInputBox
              topText={"Username"}
              onChange={(text: string) => {
                handleFormInput(text, "username");
              }}
              status={registrationFormStatus.username}
              isPassword={false}
              isEmail={false}
              validator={usernameValidator}
            />
            <AuthFormTextInputBox
              topText={"Password"}
              onChange={(text: string) => {
                handleFormInput(text, "password");
              }}
              status={registrationFormStatus.password}
              isPassword={true}
              isEmail={false}
              validator={passwordValidator}
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
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <ThonburiLight style={{ fontSize: 14 }}>
              I already have an account.{" "}
              <ThonburiLight
                style={styles.linkText}
                onPress={() => {
                  dispatch(setDisplayedModal("login"));
                  dispatch(setPreviousModalHeight(modalHeight));
                }}
              >
                Sign in
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
