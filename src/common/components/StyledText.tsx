import { Text, TextProps } from './Themed';

export function EuphoriaText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'euphoria' }]} />;
}

export function ThonburiLight(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'thonburi-light' }]} />
  );
}

export function ThonburiRegular(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'thonburi-regular' }]} />
  );
}

export function ThonburiBold(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'thonburi-bold' }]} />
  );
}

