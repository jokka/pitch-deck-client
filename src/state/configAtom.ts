import { atom } from 'jotai';

export default atom({
  apiUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:9000',
});
