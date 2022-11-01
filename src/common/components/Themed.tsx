/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Animated, StyleProp, Text as DefaultText, View as DefaultView, ViewStyle } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type AnimatedViewProps = ThemeProps & any

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ModalView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'modalBackground'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function AnimatedModalView(props: AnimatedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'modalBackground'
  );

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}
