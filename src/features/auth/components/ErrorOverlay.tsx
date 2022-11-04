import { View, StyleSheet, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";

import { overlayErrorModal, renderErrorModal, selectOverlayErrorMessage } from "../authSlice";
import {
  ModalView as ThemedModalView,
  View as ThemedView,
} from "../../../common/components/Themed";
import {
  ThonburiBold,
  ThonburiRegular,
} from "../../../common/components/StyledText";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../common/constants/Colors";

export default function ErrorOverlay() {
  const message = useSelector(selectOverlayErrorMessage);
  const dispatch = useDispatch();
  return (
    <BlurView style={styles.background} intensity={40}>
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
          <Pressable style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : Colors.common.lightYellow,
              },
              styles.button,
            ]}
            onPress={()=>{dispatch(overlayErrorModal(false))}}
            >
            <Text style={{fontSize: 18, fontFamily: "thonburi-bold", color: Colors.light.text}}> Dismiss</Text>
          </Pressable>
        </ThemedModalView>
      </ThemedModalView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
  topContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modal: {
    height: "30%",
    width: "80%",
    borderRadius: 16,
  },
  bodyText: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  modalBody: {
    height: "55%",
    width: "100%",
    padding: 20,
    position: "absolute",
    top: "20%",
    overflow: "scroll",
  },
  modalFooter: {
    width: "100%",
    height: "25%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    width: "50%",
    height: "65%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
