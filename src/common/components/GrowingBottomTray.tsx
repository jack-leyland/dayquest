import { AnimatedModalView as AnimatedThemedView } from "./Themed";
import { Animated, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";

export interface GrowingBottomTrayProps {
  duration: number;
  from: number;
  to: number;
  onAnimationFinish?: Function;
  children?: React.ReactNode;
}

export default function GrowingBottomTray(props: GrowingBottomTrayProps) {
  const height = useRef(new Animated.Value(props.from)).current;

  const animationConfig = {
    toValue: props.to,
    duration: props.duration,
    useNativeDriver: false,
  };

  useEffect(() => {
    Animated.timing(height, animationConfig).start(() => {props.onAnimationFinish?.()});
  }, []);

  return (
    <AnimatedThemedView style={{ ...styles.container, height: height }}>
      {props.children}
    </AnimatedThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 21,
  },
});
