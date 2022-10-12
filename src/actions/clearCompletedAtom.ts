import { atom } from 'jotai';
import fileUploadsAtom from '../state/fileUploadsAtom';

export default atom(null, async (get, set) => {
  const fileUploads = get(fileUploadsAtom);

  const pendingFileUploads = fileUploads.filter(fileUpload => {
    const state = get(fileUpload.stateAtom);

    return state.is === 'Pending' || state.is === 'InProgress';
  });

  set(fileUploadsAtom, pendingFileUploads);
});
