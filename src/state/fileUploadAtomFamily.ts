import { atom, PrimitiveAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import Document from '../model/Document';

export default atomFamily<File, PrimitiveAtom<FileUploadState>>(() =>
  atom<FileUploadState>({
    is: 'Pending',
  })
);

type FileUploadState = Pending | InProgress | Completed | Failed;

interface Pending {
  is: 'Pending';
}

interface InProgress {
  is: 'InProgress';
  abortController: AbortController;
}

interface Completed {
  is: 'Completed';
  document: Document;
}

interface Failed {
  is: 'Failed';
  error?: any;
}
