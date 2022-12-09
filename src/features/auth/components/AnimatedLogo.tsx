import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import LevelUpIcon from "../../../../assets/noun-level-up.svg";

interface FadeInLogoProps {
  fadeDuration: number
}

const FadeInLogo = ({fadeDuration}: FadeInLogoProps) => {
  const fadeLogo = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeLogo, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  }, [])


  return (
    <Animated.View style={{ ...styles.logoContainer, opacity: fadeLogo }}>
      <Text style={styles.logoText}>DayQuest</Text>
      <View style={styles.sloganBox}>
        <Text style={styles.sloganText}>Level up your habits</Text>
        <LevelUpIcon width={40} height={40} fill={"#000000"} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
})

export default FadeInLogo;
