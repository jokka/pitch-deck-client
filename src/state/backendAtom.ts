import { atom } from 'jotai';
import axios from 'axios';
import configAtom from './configAtom';

export default atom(get =>
  axios.create({
    baseURL: get(configAtom).apiUrl,
  })
);
