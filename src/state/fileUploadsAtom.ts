import { PrimitiveAtom, atom } from 'jotai';
import Document from '../model/Document';

export default atom<FileUpload[]>([]);

export interface FileUpload {
  file: File;
  stateAtom: PrimitiveAtom<FileUploadState>;
}

export type FileUploadState = Pending | InProgress | Completed | Failed;

interface Pending {
  is: 'Pending';
}

interface InProgress {
  is: 'InProgress';
  abortController: AbortController;
  progress?: number;
}

interface Completed {
  is: 'Completed';
  document: Document;
}

interface Failed {
  is: 'Failed';
  error?: any;
}
