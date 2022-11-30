import axios from 'axios'

const authServer = axios.create({
    baseURL:'http://192.168.1.197:8081/',
    timeout: 2000,
})

export default authServer 