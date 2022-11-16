import {
  Pressable,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import { ThonburiLight } from "./StyledText";
import NavigationIcon from "../navigation/NavigationIcon";
import React from "react";

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name == "Record") {
          return (
            <OverLayCircle key={index}>
              <ListItem
                routeName={route.name}
                onPress={onPress}
                label={label}
                color={Colors.light.tint}
                isFocused={isFocused}
                isMiddle={true}
              />
            </OverLayCircle>
          );
        } else {
          return (
            <ListItem
              routeName={route.name}
              onPress={onPress}
              label={label}
              color={Colors.dark.tint}
              key={index}
              isFocused={isFocused}
              isMiddle={false}
            />
          );
        }
      })}
    </View>
  );
};

type ListItemProps = {
  routeName: string;
  onPress: (event: GestureResponderEvent) => void;
  label: string;
  index?: number;
  color: string;
  isFocused: boolean;
  isMiddle: boolean;
};

const ListItem = ({
  routeName,
  onPress,
  label,
  index,
  color,
  isFocused,
  isMiddle,
}: ListItemProps) => {
  return (
    <View key={index} style={styles.mainItemContainer}>
      <Pressable onPress={onPress}>
        <View
          style={
            {
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              opacity: isFocused ? 1 : !isMiddle ? 0.4 : 1,
            }}
        >
          <NavigationIcon routeName={routeName} color={color} size={30} />
          <ThonburiLight style={{ color: color }}>{label}</ThonburiLight>
        </View>
      </Pressable>
    </View>
  );
};

type OverlayProps = {
  index?: number;
  children: React.ReactNode;
};

const OverLayCircle = ({ children, index }: OverlayProps) => {
  return (
    <View key={"circle"} style={styles.middleButton}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  middleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.common.brightYellow,
    borderRadius: 80 / 2,
    height: 80,
    width: 80,
  },
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    backgroundColor: Colors.dark.darkerBackground,
    borderRadius: 100,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default BottomTabBar;
