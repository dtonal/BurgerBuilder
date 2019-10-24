import axios from 'axios';
import {baseUrl} from './config/config';

console.log(baseUrl);
const instance = axios.create({
    baseURL: baseUrl
});

export default instance;