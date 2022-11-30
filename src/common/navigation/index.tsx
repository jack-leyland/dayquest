import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabBar from '../components/BottomTabBar';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { BottomTabParamList, RootStackParamList } from './types';
import AuthScreen from '../../features/auth/screens/AuthScreen';
import HomeScreen from '../../features/home/screens/HomeScreen';
import OtherScreen from '../../features/home/screens/OtherScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Auth" component={AuthScreen} />
      <RootStack.Screen name="TabNavigator" component={TabNavigator} />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="ErrorModal" component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
function TabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Quests" component={OtherScreen} />
      <BottomTab.Screen name="Record" component={HomeScreen} />
      <BottomTab.Screen name="Achieve" component={HomeScreen} />
      <BottomTab.Screen name="Stats" component={OtherScreen} />
    </BottomTab.Navigator>
  );
}
