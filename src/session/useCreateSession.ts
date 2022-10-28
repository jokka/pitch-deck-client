import { useAtomValue } from 'jotai';
import backendAtom from '../state/backendAtom';
import { useMutation } from '@tanstack/react-query';
import Session from '../model/Session';

export default function useCreateSession() {
  const backend = useAtomValue(backendAtom);

  return useMutation(async () => {
    const response = await backend.get('/session');
    return Session.parse(response.data);
  });
}
