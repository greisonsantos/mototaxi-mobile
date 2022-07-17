import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:21117/api',
  baseURL: 'http://japsolucoestec.com.br:21117/api'
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@entrega:token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;
