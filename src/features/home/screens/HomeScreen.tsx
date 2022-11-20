import { View, StyleSheet } from "react-native"
import MainScreenLayout from "../../../common/components/MainScreenLayout"
import {View as ThemedView} from "../../../common/components/Themed"
import {Text} from "../../../common/components/Themed"
import FlavorText from "../components/FlavorText"

export default function HomeScreen() {
    return(
        <MainScreenLayout>
            <FlavorText lastFiveScores={null}/>
        </MainScreenLayout>
    )
}

const styles = StyleSheet.create({
    
})

