import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import useColorScheme from "../../../common/hooks/useColorScheme";

interface AuthButtonProps {
  text: string;
  lightThemeTextColorOverride?: string;
  darkThemeTextColorOverride?: string;
  onPress?: () => {}
}

export default function (props: AuthButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderColor: pressed ? "white" : Colors.common.lightYellow,
        },
        styles.signInButton,
      ]}
      onPress={() => {
        dispatch(setDisplayedModal("login"));
        dispatch(setPreviousModalHeight(modalHeight));
      }}
    >
      <Text style={{ ...styles.text, color: "white" }}>Sign In</Text>
    </Pressable>
  );
}
