import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { z } from 'zod';
import backendAtom from '../state/backendAtom';
import Document from '../model/Document';

export default function useDocuments() {
  const backend = useAtomValue(backendAtom);

  return useQuery(['documents'], async ({ signal }) => {
    const response = await backend.get('/documents', { signal });
    return z.array(Document).parse(response.data);
  });
}
