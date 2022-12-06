import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const clearLocalStorage = () => {
    const clearItems = async () => {
        try {
            await SecureStore.deleteItemAsync("last_user_access")
            await SecureStore.deleteItemAsync("last_user_refresh")
            await AsyncStorage.removeItem("last_user_id")
        } catch (err) {
            console.error("Error clearing local storage: ", err)
        }
    }
    clearItems()
}