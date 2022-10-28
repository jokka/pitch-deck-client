import { useAtomValue } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import backendAtom from '../state/backendAtom';

export default function useVerifySession() {
  const backend = useAtomValue(backendAtom);

  return useMutation(async (sessionToken: string) => {
    await backend.get('/session/' + sessionToken);
    return true;
  });
}
