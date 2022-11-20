import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function useLastUserId(): string | null {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const getId = async () => {
            try {
              const id = await AsyncStorage.getItem('last_user_id')
              setUserId(id)
            } catch(e) {
              console.log(e)
            }
          }
        getId()
    }, [])
    
    return userId 
}