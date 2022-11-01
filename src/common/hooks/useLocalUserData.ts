import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function useLocalTokens() {
    const [accessToken, setAccessToken] = useState<String | null>(null);
    const [refreshToken, setRefreshToken] = useState<String | null>(null);

    useEffect(() => {
        async function getTokensFromKeychain() {
            try {
                let access = await SecureStore.getItemAsync('last_user_access')
                let refresh = await SecureStore.getItemAsync('last_user_refresh')
                if (access) {setAccessToken(access)}
                if (refresh) {setRefreshToken(refresh)}

            } catch (e) {
                console.warn(e)
            }
        }
        getTokensFromKeychain()
    },[])

    return {
        access: accessToken,
        refresh: refreshToken
    }
}