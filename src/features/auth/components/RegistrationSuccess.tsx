import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Colors from '../../../common/constants/Colors';
import { ThonburiBold } from '../../../common/components/StyledText';
import { useDispatch } from 'react-redux';
import { RootNavigationProps } from '../../../common/navigation/types';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationSuccess() {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationProps>();
  return (
    <View style={styles.container}>
      <ThonburiBold style={{ fontSize: 32, marginBottom: 40 }}>
        Welcome aboard!
      </ThonburiBold>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'white' : Colors.common.lightYellow,
          },
          styles.button,
        ]}
        onPress={() => {
          navigation.navigate('TabNavigator');
        }}
      >
        <Text
          style={{
            color: Colors.light.text,
            fontSize: 22,
            fontFamily: 'thonburi-bold',
          }}
        >
          Get started
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
