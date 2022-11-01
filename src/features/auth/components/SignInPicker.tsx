import {
    Animated,
    StyleSheet,
    Text,
    Pressable,
  } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../../common/constants/Colors";
import Layout from "../../../common/constants/Layout"
import { useRef, useState } from "react";
import GrowingBottomTray from "../../../common/components/GrowingBottomTray";
import {
    disableAuthNavigator,
    enableAuthNavigator,
    selectActiveModal,
    setAccessToken,
    setDisplayedModal,
    setRefreshToken,
  } from "../authSlice";

export default function SignInPicker() {
    const [showButtons, setShowButtons] = useState(false)
    const fade = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    
    const triggerButtonRender = () =>{ 
        setShowButtons(true);
        Animated.timing(fade,{
            duration: 200,
            toValue:1,
            useNativeDriver: true
        }).start()}
    
    
    return(
        <GrowingBottomTray 
            duration={500} 
            from={0} 
            to={Math.round(Layout.window.height/2)}
            onAnimationFinish={triggerButtonRender}
            >
            {showButtons && (
                <Animated.View style={{...styles.container, opacity: fade}}> 
                    <Pressable style={styles.signUpButton}>
                        <Text style={styles.text}>Sign Up</Text>
                    </Pressable>
                    <Pressable style={styles.signInButton}>
                        <Text style={{...styles.text, color: "white"}}>Sign In</Text>
                    </Pressable>
                </Animated.View>
            )}

        </GrowingBottomTray>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
        borderColor: "white",
    },
    text: {
        color: "black",
        fontFamily: "thonburi-bold",
        fontSize: 20
    },
    signUpButton: {
        width:"75%",
        height: "15%",
        backgroundColor: Colors.common.lightYellow,
        borderRadius: 16,
        justifyContent:"center",
        alignItems:"center",
        margin: 20
    },
    signInButton: {
        width:"75%",
        height: "15%",
        borderColor: Colors.common.lightYellow,
        borderRadius: 16,
        borderWidth: 3,
        justifyContent:"center",
        alignItems:"center",
    }
})