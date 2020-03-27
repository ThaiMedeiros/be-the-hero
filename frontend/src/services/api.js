import axios from 'axios'; //cliente de requisições http

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;