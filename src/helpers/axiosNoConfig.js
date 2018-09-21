import axios from 'axios';

const instance = axios.create({
  baseURL : process.env.NODE_ENV === 'development'
    ? 'http://localhost:7777/v1/'
    : 'https://api.bocaapp.com/v1/',
  timeout : 10000,
});

export default instance;