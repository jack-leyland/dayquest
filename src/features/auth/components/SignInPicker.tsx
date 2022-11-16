import { Animated, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../common/constants/Colors";
import Layout from "../../../common/constants/Layout";
import { useRef, useState } from "react";
import GrowingBottomTray from "../../../common/components/GrowingBottomTray";
import {
  selectPreviousModalHeight,
  setDisplayedModal,
  setPreviousModalHeight,
} from "../authSlice";
import useColorScheme from "../../../common/hooks/useColorScheme";

export default function SignInPicker() {
  const [showButtons, setShowButtons] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const modalHeight = Math.round(Layout.window.height / 2);
  const lastModalHeight = useSelector(selectPreviousModalHeight);
  const theme = useColorScheme()

  const triggerButtonRender = () => {
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setShowButtons(true);
  };

  return (
    <GrowingBottomTray
      duration={500}
      from={lastModalHeight}
      to={modalHeight}
      onAnimationFinish={triggerButtonRender}
    >
      {showButtons && (
        <Animated.View style={{ ...styles.container, opacity: fade }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : Colors.common.brightYellow,
              },
              styles.signUpButton,
            ]}
            onPress={() => {
              dispatch(setDisplayedModal("register"));
              dispatch(setPreviousModalHeight(modalHeight));
            }}
          >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                borderColor: pressed ? "white" : Colors.common.brightYellow,
              },
              styles.signInButton,
            ]}
            onPress={() => {
              dispatch(setDisplayedModal("login"));
              dispatch(setPreviousModalHeight(modalHeight));
            }}
          >
            <Text style={{ ...styles.text, color: theme === "dark" ? "white" : Colors.common.brightYellow }}>Sign In</Text>
          </Pressable>
        </Animated.View>
      )}
    </GrowingBottomTray>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  text: {
    fontFamily: "thonburi-bold",
    fontSize: 20,
  },
  signUpButton: {
    width: "80%",
    height: "15%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  signInButton: {
    width: "80%",
    height: "15%",
    borderRadius: 16,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
