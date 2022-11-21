import { View, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { selectActiveUser } from "../../../app/appSlice"
import MainScreenLayout from "../../../common/components/MainScreenLayout"
import {View as ThemedView} from "../../../common/components/Themed"
import {Text} from "../../../common/components/Themed"
import FlavorText from "../components/FlavorText"
import { UserSnapshotBox } from "../components/UserSnapshotBox"

export default function HomeScreen() {
    const user = useSelector(selectActiveUser)
    return(
        <MainScreenLayout>
            <FlavorText lastFiveScores={null}/>
            <UserSnapshotBox />
        </MainScreenLayout>
    )
}

const styles = StyleSheet.create({
    
})

