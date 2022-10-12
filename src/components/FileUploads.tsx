import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import clsx from 'clsx';
import FileUploadState from './FileUploadState';
import fileUploadsAtom from '../state/fileUploadsAtom';
import ClickableText from './ClickableText';
import clearCompletedAtom from '../actions/clearCompletedAtom';

interface FileUploadsProps {
  className?: string;
}

const FileUploads = ({ className }: FileUploadsProps) => {
  const fileUploads = useAtomValue(fileUploadsAtom);
  const clearCompleted = useSetAtom(clearCompletedAtom);
  const handleClearCompleted = () => clearCompleted();

  return fileUploads.length > 0 ? (
    <div
      className={clsx(
        'fixed bottom-4 left-4 sm:left-auto right-4 min-w-fit rounded-lg border border-neutral-300 shadow-md bg-neutral-50 overflow-hidden',
        className
      )}
    >
      <div className="p-4 border-b border-neutral-300 bg-neutral-100 flex items-center gap-8">
        <p className="flex-1">File Uploads</p>
        <ClickableText onClick={handleClearCompleted}>
          Clear completed
        </ClickableText>
      </div>
      {fileUploads.map(({ file, stateAtom }) => (
        <div
          key={file.name + '-' + file.lastModified}
          className="p-4 [&:last-child]:border-b-0 border-b border-neutral-300 flex items-center gap-8"
        >
          <p className="flex-1">{file.name}</p>
          <FileUploadState stateAtom={stateAtom} />
        </div>
      ))}
    </div>
  ) : null;
};

export default FileUploads;
