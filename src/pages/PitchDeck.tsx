import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import useDocument from '../queries/useDocument';
import Spinner from '../components/graphics/Spinner';
import ExclamationTriangle from '../components/graphics/ExclamationTriangle';
import ClickableText from '../components/ClickableText';
import Home from '../components/graphics/Home';
import Page from '../components/Page';

interface PitchDeckProps {
  id: string;
}

const PitchDeck = ({ id }: PitchDeckProps) => {
  const navigate = useNavigate();
  const document = useDocument(id);

  return (
    <div className="flex flex-col items-stretch gap-8 py-4">
      <div className="flex items-center gap-2">
        <ClickableText onClick={() => navigate('/')}>
          <Home />
        </ClickableText>
        <span>/</span>
        {document.isLoading ? (
          <div className="flex items-center gap-1">
            <Spinner />
            <p>Loading document…</p>
          </div>
        ) : document.isError ? (
          <div className="flex items-center gap-1">
            <ExclamationTriangle />
            <p>Failed to load document.</p>
          </div>
        ) : (
          <h1>{document.data.fileName}</h1>
        )}
      </div>

      {document.data && (
        <div className="flex flex-col items-stretch gap-4">
          {document.data.pages.map((page, i) => (
            <Page key={i} page={page} className="drop-shadow-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { id } = useParams<'id'>();
  return id ? <PitchDeck id={id} /> : <NotFound />;
};
