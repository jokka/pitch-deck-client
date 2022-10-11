import React from 'react';
import Dropzone from '../components/Dropzone';
import { useSetAtom } from 'jotai';
import FileUploads from '../components/FileUploads';
import useDocuments from '../queries/useDocuments';
import filesAtom from '../state/filesAtom';
import Spinner from '../components/graphics/Spinner';
import ExclamationTriangle from '../components/graphics/ExclamationTriangle';
import { srcSetToString } from '../model/Image';
import { Link } from 'react-router-dom';

const PitchDecks = () => {
  const setFiles = useSetAtom(filesAtom);

  const handleDrop = (files: File[]) => setFiles(prev => [...prev, ...files]);

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
                  className="w-full h-full drop-shadow-sm cursor-pointer hover:scale-105 hover:drop-shadow-md active:scale-100 active:drop-shadow-sm transition-all flex flex-col"
                >
                  <img
                    tabIndex={-1}
                    src={document.pages[0].image.src}
                    srcSet={srcSetToString(document.pages[0].image.srcSet)}
                    alt={document.fileName}
                    className="max-w-full max-h-full m-auto"
                    style={{ aspectRatio: document.pages[0].aspectRatio }}
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
