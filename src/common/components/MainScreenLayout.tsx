import { View, StyleSheet } from "react-native"
import {View as ThemedView} from '../components/Themed'
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import useColorScheme from "../hooks/useColorScheme"

export type MainScreenLayoutProps = {
    children: React.ReactNode
}

export default function MainScreenLayout({children}:MainScreenLayoutProps){
    const theme = useColorScheme()

    return(
        <View style={styles.container}>
            <View style={{...styles.statusBar, backgroundColor: Colors[theme].statusBar}}></View>
            <ThemedView style={styles.screenContainer}>
                {children}
            </ThemedView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height:"100%", 
        width: "100%",
    },
    statusBar: {
        width: "100%",
        height: Layout.statusBarHeight
    },
    screenContainer: {
        flex:1,
        padding: 20
    }
})