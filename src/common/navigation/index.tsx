import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { renderAuthNavigator } from "../../features/auth/authSlice";
import {
  BottomTabParamList,
  RootStackParamList,
} from "../../app/types";
import AuthScreen from "../../features/auth/screens/AuthScreen";
import HomeScreen from "../../features/home/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../components/BottomTabBar";
import OtherScreen from "../../features/home/screens/OtherScreen";
import Colors from "../constants/Colors";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

function RootNavigator() {
  const authActive = useSelector(renderAuthNavigator);
  if (authActive) {
    return (
      <AuthScreen />
    );
  } else {
    return TabNavigator();
  }
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
function TabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabBar {...props} />}
      
      screenOptions={{
        headerShown: false
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen}/>
      <BottomTab.Screen name="Quests" component={OtherScreen} />
      <BottomTab.Screen name="Record" component={HomeScreen} />
      <BottomTab.Screen name="Calendar" component={HomeScreen} />
      <BottomTab.Screen name="Stats" component={HomeScreen} />
    </BottomTab.Navigator>
  );
}
