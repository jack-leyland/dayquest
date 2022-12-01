import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  TabNavigator: undefined;
  Auth: undefined;
  GlobalErrorModal: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Quests: undefined;
  Achieve: undefined;
  Record: undefined;
  Stats: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
