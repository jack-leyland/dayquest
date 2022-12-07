import AsyncStorage from '@react-native-async-storage/async-storage';

const getDeviceId = async (): Promise<string|null> => {
    let id = await AsyncStorage.getItem('device_id')
    return id
}

export default getDeviceId