import React from 'react';
import { atom, useSetAtom } from 'jotai';
import { Link } from 'react-router-dom';
import Dropzone from '../components/Dropzone';
import FileUploads from '../components/FileUploads';
import useDocuments from '../queries/useDocuments';
import fileUploadsAtom, {
  FileUpload,
  FileUploadState,
} from '../state/fileUploadsAtom';
import Spinner from '../components/graphics/Spinner';
import ExclamationTriangle from '../components/graphics/ExclamationTriangle';
import uploadFileAtom from '../actions/uploadFileAtom';
import clsx from 'clsx';
import Page from '../components/Page';

const PitchDecks = () => {
  const setFileUploads = useSetAtom(fileUploadsAtom);
  const uploadFile = useSetAtom(uploadFileAtom);

  const handleDrop = (files: File[]) => {
    const fileUploads = files.map<FileUpload>(file => {
      const stateAtom = atom<FileUploadState>({ is: 'Pending' });
      const fileUpload = { file, stateAtom };
      uploadFile(fileUpload);
      return fileUpload;
    });

    setFileUploads(prev => [...prev, ...fileUploads]);
  };

  const documents = useDocuments();

  return (
    <div className="flex flex-col items-stretch gap-8 py-4">
      <h1>Pitch Deck Uploader</h1>

      <Dropzone accept={{ 'application/pdf': ['.pdf'] }} onDrop={handleDrop} />

      <div>
        {documents.isLoading ? (
          <div className="flex items-center gap-1">
            <Spinner />
            <p>Loading documents…</p>
          </div>
        ) : documents.isError ? (
          <div className="flex items-center gap-1">
            <ExclamationTriangle />
            <p>Failed to load documents.</p>
          </div>
        ) : documents.data.length === 0 ? (
          <p>No documents are uploaded yet. Go ahead and upload one.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {documents.data.map(document => (
              <div
                key={document.id}
                className="aspect-square flex items-center justify-center"
              >
                <Link
                  to={'/' + document.id}
                  className={clsx(
                    'w-full h-full drop-shadow-sm cursor-pointer hover:scale-105 hover:drop-shadow-md active:scale-100 active:drop-shadow-sm transition-all flex',
                    {
                      'flex-col': document.pages[0].aspectRatio < 1,
                    }
                  )}
                >
                  <Page
                    page={document.pages[0]}
                    className="max-w-full max-h-full m-auto text-xs"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <FileUploads className="position-absolute" />
    </div>
  );
};

export default PitchDecks;
