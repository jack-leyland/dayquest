import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThonburiBold, ThonburiLight } from "../../../common/components/StyledText";
import Colors from "../../../common/constants/Colors";

export default function TitleBar() {
  return (
    <View style={styles.container}>
      <ThonburiBold style={styles.text}>
        Quests
      </ThonburiBold>
      <TouchableOpacity style={styles.button}>
        <AntDesign
          name="pluscircleo"
          size={15}
          color={Colors.common.brightYellow}
        />
        <ThonburiLight style={{color: Colors.common.brightYellow, paddingLeft: 4}}>New Quest</ThonburiLight>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    text: {
        flex:1,
        fontSize: 30, 
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    button: {
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 7,
    }
});