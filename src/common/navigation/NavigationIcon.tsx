import { Fontisto, Ionicons } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';

type NavigationIconProps = {
  routeName: string;
  color: string | OpaqueColorValue | undefined;
  size: number;
};

export default function NavigationIcon({
  routeName,
  color,
  size,
}: NavigationIconProps) {
  let icon = undefined;
  switch (routeName) {
    case 'Home':
      return <Fontisto name="home" color={color} size={size} />;
    case 'Quests':
      return <Fontisto name="compass" color={color} size={size} />;
    case 'Achieve':
      return <Fontisto name="calendar" color={color} size={size} />;
    case 'Stats':
      return <Ionicons name="person" color={color} size={size} />;
    case 'Record':
      return <Fontisto name="check" color={color} size={size} />;
    default:
      return <Fontisto name="question" color={color} size={size} />;
  }
}
