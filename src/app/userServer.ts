import axios from 'axios'

const userServer = axios.create({
    baseURL:'http://192.168.1.17:8080/user/',
    timeout: 2000,
})

export default userServer 