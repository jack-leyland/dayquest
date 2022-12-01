import { StyleSheet, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

import { ModalView as ThemedModalView, View as ThemedView } from './Themed';
import { ThonburiBold, ThonburiRegular } from './StyledText';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { selectGlobalErrorMessage } from '../../app/appSlice';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../navigation/types';

// This component overlays the entire app and is intended only for unrecoverable errors.
// Message title and content must be set in the global app state before rendering this component.
// Dismissing this error message sends the user back to the AuthScreen

export default function GlobalErrorModal() {
  const message = useSelector(selectGlobalErrorMessage);
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <BlurView style={styles.background} intensity={10}>
      <ThemedModalView style={styles.modal}>
        <ThemedView style={styles.topContainer}>
          <ThonburiBold style={{ fontSize: 18 }}>
            Something went wrong!
          </ThonburiBold>
        </ThemedView>
        <ThemedModalView style={styles.modalBody}>
          <ThonburiRegular style={styles.bodyText}>{message}</ThonburiRegular>
        </ThemedModalView>
        <ThemedModalView style={styles.modalFooter}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'white' : Colors.common.lightYellow,
              },
              styles.button,
            ]}
            onPress={() => {
              navigation.navigate('Auth');
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'thonburi-bold',
                color: Colors.light.text,
              }}
            >
              {' '}
              Dismiss
            </Text>
          </Pressable>
        </ThemedModalView>
      </ThemedModalView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modal: {
    height: '30%',
    width: '80%',
    borderRadius: 16,
  },
  bodyText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  modalBody: {
    height: '55%',
    width: '100%',
    padding: 20,
    position: 'absolute',
    top: '20%',
    overflow: 'scroll',
  },
  modalFooter: {
    width: '100%',
    height: '25%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    width: '50%',
    height: '65%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
