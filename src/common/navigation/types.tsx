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
  Medals: undefined;
  Record: undefined;
  Profile: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
