import axios from 'axios';
import { config } from 'dotenv';
import authHeader from './authHeader';

config();

axios.defaults.headers.token = authHeader() ? authHeader() : '';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
           ? 'https://fast-foo.herokuapp.com/api/v1'
           : 'localhost:4000/api/v1'
});

export default axiosInstance;
