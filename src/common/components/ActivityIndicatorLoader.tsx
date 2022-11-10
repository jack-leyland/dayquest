import {
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    Text,
    ActivityIndicator,
    StyleProp,
    TextStyle,
    ColorValue,
  } from "react-native";

export interface LoaderProps {
    text: String;
    textStyle: StyleProp<TextStyle> 
    viewStyle: any;
    indicatorColor: ColorValue | undefined;
    indicatorSize: "small" | "large";
}

export default function ActivityIndicatorLoader( {text, textStyle, viewStyle, indicatorColor, indicatorSize} : LoaderProps) {
    
    return (
        <Animated.View style={viewStyle}>
            <ActivityIndicator size={indicatorSize} color={indicatorColor} />
            <Text style={textStyle}>
                {text}
            </Text>
        </Animated.View>
    )
}