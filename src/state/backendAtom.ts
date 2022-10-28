import { atom } from 'jotai';
import axios from 'axios';
import configAtom from './configAtom';
import sessionTokenAtom from '../session/sessionTokenAtom';

export default atom(get => {
  const axiosInstance = axios.create({
    baseURL: get(configAtom).apiUrl,
  });

  axiosInstance.interceptors.request.use(config => {
    config.headers = {
      Authorization: `Bearer ${get(sessionTokenAtom)}`,
    };

    return config;
  });

  return axiosInstance;
});
