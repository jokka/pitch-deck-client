import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import Spinner from './graphics/Spinner';
import Check from './graphics/Check';
import ExclamationTriangle from './graphics/ExclamationTriangle';
import ClickableText from './ClickableText';
import { FileUpload } from '../state/fileUploadsAtom';

interface FileUploadStateProps {
  stateAtom: FileUpload['stateAtom'];
}

const FileUploadState = ({ stateAtom }: FileUploadStateProps) => {
  const navigate = useNavigate();

  const state = useAtomValue(stateAtom);

  return (
    <span>
      {state.is === 'Pending' ? (
        <div className="flex items-center gap-1">
          <Spinner />
          <p>Starting…</p>
        </div>
      ) : state.is === 'InProgress' ? (
        <div className="flex items-center gap-1">
          <Spinner />
          {state.progress === undefined ? (
            <p>In progress…</p>
          ) : state.progress === 1 ? (
            <p>Processing…</p>
          ) : (
            <p>Uploading… {Math.round(state.progress * 100)}%</p>
          )}
        </div>
      ) : state.is === 'Completed' ? (
        <div className="flex items-center gap-1">
          <Check />
          <p>Uploaded</p>
          <ClickableText onClick={() => navigate('/' + state.document.id)}>
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

export default FileUploadState;
