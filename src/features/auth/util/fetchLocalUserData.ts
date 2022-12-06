import { LocalUserData } from "../../../app/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const fetchLocalUserData = async (): Promise<LocalUserData> => {
    try {
        let access = await SecureStore.getItemAsync('last_user_access')
        let refresh = await SecureStore.getItemAsync('last_user_refresh')
        let id = await AsyncStorage.getItem('last_user_id')
        return {
            access: access,
            refresh: refresh,
            userId: id
        }
    } catch (err) {
        console.log(err)
        return {
            access: null,
            refresh: null,
            userId: null
        }
    }
}