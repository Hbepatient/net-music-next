import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 3000
});

export default service;