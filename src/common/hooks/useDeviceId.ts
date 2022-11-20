import 'react-native-get-random-values';
import { useEffect, useState } from 'react';
import { User } from '../../app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from "uuid"


export default function useDeviceId(): string {
    const [deviceId, setDeviceId] = useState<string>("");

    useEffect(() => {
        const getId = async () => {
            try {
              let id = await AsyncStorage.getItem('device_id')
              if (!id) {
                id = uuidv4()
                await AsyncStorage.setItem('device_id', id)
              }
              setDeviceId(id)
            } catch(e) {
              console.log(e)
            }
          }
        getId()
    }, [])
    
    return deviceId
}