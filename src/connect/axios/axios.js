// const SERVER_URL = "http://35.79.219.250/api/v1"
import axios from 'axios';

const SERVER_URL = axios.create({
    baseURL: 'http://35.79.219.250/api/v1',
})

// const LOCALHOST_URL = axios.create({
//     baseURL: 'http://localhost/api/v1',
// })

export default SERVER_URL;