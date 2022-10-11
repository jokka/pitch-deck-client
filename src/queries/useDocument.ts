import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import backendAtom from '../state/backendAtom';
import Document from '../model/Document';

export default function useDocument(id: string) {
  const backend = useAtomValue(backendAtom);

  return useQuery(['documents', id], async ({ signal }) => {
    const response = await backend.get('/documents/' + id, { signal });
    return Document.parse(response.data);
  });
}
