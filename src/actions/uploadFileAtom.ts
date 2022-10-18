import { atom } from 'jotai';
import { queryClientAtom } from 'jotai/query';
import { FileUpload } from '../state/fileUploadsAtom';
import backendAtom from '../state/backendAtom';
import Document from '../model/Document';

export default atom(null, async (get, set, { file, stateAtom }: FileUpload) => {
  const backend = get(backendAtom);
  const abortController = new AbortController();

  if (get(stateAtom).is !== 'Pending') {
    return;
  }

  set(stateAtom, { is: 'InProgress', abortController });

  try {
    const data = new FormData();
    data.append('file', file);

    const response = await backend.post('/documents', data, {
      signal: abortController.signal,
      onUploadProgress: e => {
        set(stateAtom, {
          is: 'InProgress',
          abortController,
          progress: e.progress,
        });
      },
    });

    if (abortController.signal.aborted) {
      set(stateAtom, {
        is: 'Failed',
        error: abortController.signal.reason,
      });
      return;
    }

    try {
      get(queryClientAtom).invalidateQueries(['documents']);
    } catch (e) {
      // Suppress potential cache invalidation, we can live with it
    }

    set(stateAtom, {
      is: 'Completed',
      document: Document.parse(response.data),
    });
  } catch (error) {
    set(stateAtom, { is: 'Failed', error });
  }
});
