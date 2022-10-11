import { atom } from 'jotai';
import filesAtom from './filesAtom';
import fileUploadAtomFamily from './fileUploadAtomFamily';

export default atom(null, (get, set) => {
  const files = get(filesAtom);

  const filesWithPendingUploads = files.filter(file => {
    const fileUpload = get(fileUploadAtomFamily(file));

    return fileUpload.is === 'Pending' || fileUpload.is === 'InProgress';
  });

  set(filesAtom, filesWithPendingUploads);
});
