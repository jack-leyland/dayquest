import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThonburiLight } from "../../../common/components/StyledText";
import Colors from "../../../common/constants/Colors";
import useColorScheme from "../../../common/hooks/useColorScheme";
import { FormStatus, PasswordFormStatus } from "../types";


interface AuthFormTextInputBoxProps {
  topText: String;
  status: FormStatus | PasswordFormStatus;
  isPassword: boolean;
  isEmail: boolean;
  onChange: (value: string) => void;
  validator?: (value: string) => void;
}

// This component will validate on Blur of input field if a validator is provided in the props 


export default function AuthFormTextInputBox(props: AuthFormTextInputBoxProps) {
  const theme = useColorScheme();
  const [value, setValue] = useState<string>("");
  const [activeBoxStyle, setActiveBoxStyle] = useState<StyleProp<ViewStyle>>(
    styles.inputBox
  );
  const [textColor, setTextColor] = useState<string>(Colors[theme].text);
  const [inputTextColor, setInputTextColor] = useState<string>(Colors.light.text);
  const [hidePass, setHidePass] = useState<boolean>(props.isPassword);
  const [status, setStatus] = useState<AuthFormTextInputBoxProps["status"]>(props.status)
  
  
  useEffect(() => {
  
    if (props.status.isBadInput) {
      setActiveBoxStyle([styles.inputBox, styles.inputBoxBad]);
      setTextColor(Colors.common.red);
      setInputTextColor(Colors.common.red);
    } else {
      setActiveBoxStyle(styles.inputBox);
      setTextColor(Colors[theme].text);
      setInputTextColor(Colors.light.text);
    }
    setStatus(props.status)
  }, [props.status]);


  return (
    <View style={styles.container}>
      <ThonburiLight style={[styles.topText, { color: textColor }]}>
        {props.topText}
      </ThonburiLight>
      <View style={activeBoxStyle}>
        <TextInput
          onChangeText={(text) => {
            setValue(text);
            props.onChange(text)
          }}
          value={value}
          style={[styles.textInput, { color: inputTextColor }]}
          maxLength={50}
          keyboardAppearance={theme}
          keyboardType={props.isEmail ? "email-address" : "default"}
          returnKeyType="done"
          enablesReturnKeyAutomatically={true}
          secureTextEntry={hidePass}
          onFocus={() => {
            if (!status.isBadInput) {
              setActiveBoxStyle([styles.inputBox, styles.inputBoxFocus]);
            }
          }}
          onBlur={() => {
            if (!status.isBadInput) {
              setActiveBoxStyle(styles.inputBox);
            }
            props.validator?.(value)
          }}
        />
        {value && (
          <TouchableOpacity
            style={styles.closeButtonParent}
            onPress={() => {
              setValue("")
              props.onChange("")
              props.validator?.("")
            }}
          >
            <AntDesign
              name="closecircle"
              size={20}
              color={Colors.dark.modalBackground}
            />
          </TouchableOpacity>
        )}
        {props.isPassword && (
          <TouchableOpacity
            style={styles.closeButtonParent}
            onPress={() => setHidePass(!hidePass)}
          >
            <AntDesign name="eye" size={30} color={Colors.light.text} />
          </TouchableOpacity>
        )}
      </View>
      {status.isBadInput && !props.isPassword && (
        <View style={styles.badTextContainer}>
          <ThonburiLight style={{ color: textColor, fontSize: 12}}>
            {"badInputText" in status && status.badInputText}
          </ThonburiLight>
        </View>
      )}
      {status.isBadInput && props.isPassword && (
        <View style={styles.criteriaContainer}>
          {"criteria" in status && status.criteria.map((text, index)=>{
            return (
              <ThonburiLight key={index} style={[styles.passwordCriteria,{color: textColor}]}>
                {text}
              </ThonburiLight>
            )
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  textInput: {
    height: "100%",
    fontSize: 18,
    padding: 10,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  topText: {
    width: "100%",
    marginLeft: 10,
    fontSize: 12,
  },
  inputBox: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBoxBad: {
    borderWidth: 2,
    borderColor: Colors.common.red,
  },
  inputBoxFocus: {
    borderWidth: 2,
    borderColor: Colors.common.lightYellow,
  },
  badTextContainer: {
    width: "100%",
    height: 20,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  criteriaContainer: {
    width: "100%",
    height: 40,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  passwordCriteria: {
    fontSize: 12,
    width:"100%",
    textAlign: "left",
    marginLeft: 10
  }
});
