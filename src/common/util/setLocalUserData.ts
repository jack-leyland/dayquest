import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { LocalUserData } from '../types';

export const setLocalUserData = async (data: LocalUserData): Promise<void> => {
    try {
        if (data.access) await SecureStore.setItemAsync('last_user_access', data.access)
        if (data.refresh) await SecureStore.setItemAsync('last_user_refresh', data.refresh)
        if (data.userId) await AsyncStorage.setItem('last_user_id', data.userId)
        return 
    } catch (err) {
        console.log(err)
        return
    }
}