import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import fileUploadAtomFamily from '../state/fileUploadAtomFamily';
import backendAtom from '../state/backendAtom';
import Spinner from './graphics/Spinner';
import Check from './graphics/Check';
import ExclamationTriangle from './graphics/ExclamationTriangle';
import Document from '../model/Document';
import ClickableText from './ClickableText';

interface FileUploadProps {
  file: File;
}

const FileUpload = ({ file }: FileUploadProps) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [fileUpload, setFileUpload] = useAtom(fileUploadAtomFamily(file));

  const backend = useAtomValue(backendAtom);

  useEffect(() => {
    const abortController = new AbortController();

    setFileUpload(fileUpload => {
      if (fileUpload.is === 'Pending') {
        (async () => {
          try {
            const data = new FormData();
            data.append('file', file);

            const response = await backend.post('/documents', data, {
              signal: abortController.signal,
              onUploadProgress: e => {
                setFileUpload(upload => {
                  if (upload.is === 'InProgress') {
                    return {
                      is: 'InProgress',
                      abortController,
                      progress: e.progress,
                    };
                  } else {
                    return fileUpload;
                  }
                });
              },
            });

            if (abortController.signal.aborted) {
              setFileUpload({
                is: 'Failed',
                error: abortController.signal.reason,
              });
              return;
            }

            queryClient.invalidateQueries(['documents']);

            setFileUpload({
              is: 'Completed',
              document: Document.parse(response.data),
            });
          } catch (error) {
            setFileUpload({ is: 'Failed', error });
          }
        })();

        return { is: 'InProgress', abortController };
      } else {
        return fileUpload;
      }
    });

    return () => abortController.abort();
  }, [backend, file, queryClient, setFileUpload]);

  return fileUpload.is === 'Pending' ? null : (
    <span>
      {fileUpload.is === 'InProgress' ? (
        <div className="flex items-center gap-1">
          <Spinner />
          {fileUpload.progress === undefined ? (
            <p>In progress…</p>
          ) : fileUpload.progress === 1 ? (
            <p>Processing…</p>
          ) : (
            <p>Uploading… {Math.round(fileUpload.progress * 100)}%</p>
          )}
        </div>
      ) : fileUpload.is === 'Completed' ? (
        <div className="flex items-center gap-1">
          <Check />
          <p>Uploaded</p>
          <ClickableText onClick={() => navigate('/' + fileUpload.document.id)}>
            View doc →
          </ClickableText>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <ExclamationTriangle />
          <p>Failed</p>
        </div>
      )}
    </span>
  );
};

export default FileUpload;
