import Colors from '../../constants/Colors';
import { ActivityIndicator } from 'react-native';
import { useThemeColor, ThemeProps } from '../Themed';
import { View } from 'react-native';

export type ThemedActivityIndicatorProps = ActivityIndicator['props'] &
  ThemeProps;

export default function ThemedActivityIndicator(
  props: ThemedActivityIndicatorProps
) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <View>
      <ActivityIndicator size={props.size} color={color} />
    </View>
  );
}
