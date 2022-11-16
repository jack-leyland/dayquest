import {View as ThemedView} from "../../../common/components/Themed"
import {Text} from "../../../common/components/Themed"
export default function OtherScreen() {
    return(
        <ThemedView style={{height:"100%", width: "100%", justifyContent: "center", alignItems:"center"}}>
            <Text>
                Other SCREEN
            </Text>
        </ThemedView>
    )
}