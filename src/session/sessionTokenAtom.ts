import { atom } from 'jotai';

const sessionTokenAtom = atom<string | null>(
  localStorage.getItem('session-token')
);

export default atom<string | null, string | null, void>(
  get => get(sessionTokenAtom),
  (get, set, value: string | null) => {
    if (value === null) {
      localStorage.removeItem('session-token');
    } else {
      localStorage.setItem('session-token', value);
    }

    set(sessionTokenAtom, value);
  }
);
