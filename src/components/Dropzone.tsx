import React from 'react';
import clsx from 'clsx';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

interface DropzoneProps {
  accept: DropzoneOptions['accept'];
  onDrop: DropzoneOptions['onDrop'];
  className?: string;
}

const Dropzone = ({ accept, onDrop, className }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'p-4 aspect-[3] flex items-center justify-center gap-2 rounded-lg cursor-pointer',
        'border-2 border-dashed',
        'border-neutral-300 text-neutral-500',
        'hover:border-indigo-300 hover:text-indigo-500',
        'transition-all active:border-indigo-500 active:text-indigo-700',
        {
          'border-indigo-300 text-indigo-500': isDragActive,
        },
        className
      )}
    >
      <input {...getInputProps()} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 flex-shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>

      <p>
        Drag and drop a{' '}
        {accept
          ? Object.values(accept)
              .flatMap(extensions => extensions)
              .map(extension => <code key={extension}>{extension}</code>)
          : 'file'}{' '}
        here, or click to select files.
      </p>
    </div>
  );
};

export default Dropzone;
