import {View as ThemedView} from "../../../common/components/Themed"
import {Text} from "../../../common/components/Themed"
export default function HomeScreen() {
    return(
        <ThemedView style={{height:"100%", width: "100%", justifyContent: "center", alignItems:"center"}}>
            <Text>
                HOME SCREEN
            </Text>
        </ThemedView>
    )
}