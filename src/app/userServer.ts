import axios from 'axios'
import { LocalUserData } from '../common/types';
import { fetchLocalUserData } from '../common/util/fetchLocalUserData';
import getDeviceId from '../common/util/getDeviceId';
import { setLocalUserData } from '../common/util/setLocalUserData';
import authServer from '../features/auth/authServer'

const userServer = axios.create({
    baseURL:'http://192.168.1.17:8080/user/',
    timeout: 2000,
})

// Use the token stored in local storage to autheticate requests to the user API
userServer.interceptors.request.use(
    async config => {
      const localUserData = await fetchLocalUserData()
        const deviceId = await getDeviceId()
      config.headers = { 
        'Authorization': `Bearer ${localUserData.access}`,
        'device': deviceId
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

// If the request returns a 401, use the auth axios instance to refresh the token
userServer.interceptors.response.use((res) => {
    return res
},
    async (err) => {
        if (!err.response || !err.response.status) {
          return Promise.reject(err);
        }

        const originalRequest = err.config
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const localUserData = await fetchLocalUserData()
            const newTokens = await authServer.post("/refresh", {"refresh_token": localUserData.refresh})
            await setLocalUserData({access: newTokens.data.access, refresh: newTokens.data.refresh, userId: localUserData.userId } as LocalUserData)
            return userServer(originalRequest)
        }
        return Promise.reject(err);
    }
)

export default userServer 

