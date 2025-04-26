import axios from 'axios';
import { setInterceptors } from './interceptors';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// 인터셉터 설정
setInterceptors(api);

export default api;
