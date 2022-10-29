import { atom } from 'jotai';

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:9000';
const assetsUrl = process.env.REACT_APP_ASSETS_URL ?? apiUrl + '/static';

export default atom({
  apiUrl,
  assetsUrl,
});
