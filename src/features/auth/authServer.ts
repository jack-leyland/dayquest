import axios from 'axios'

const authServer = axios.create({
    baseURL:'http://localhost:8081/',
    timeout: 2000,
})

export default authServer 