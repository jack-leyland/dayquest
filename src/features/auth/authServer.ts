import axios from 'axios'

const authServer = axios.create({
    baseURL:'http://192.168.1.14:8080/',
    timeout: 1000,
    headers:{"device": 'test device'}
})

export default authServer 