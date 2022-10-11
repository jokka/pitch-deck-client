import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import useDocument from '../queries/useDocument';
import Spinner from '../components/graphics/Spinner';
import ExclamationTriangle from '../components/graphics/ExclamationTriangle';
import { srcSetToString } from '../model/Image';
import ClickableText from '../components/ClickableText';
import Home from '../components/graphics/Home';

interface PitchDeckProps {
  id: string;
}

const PitchDeck = ({ id }: PitchDeckProps) => {
  const navigate = useNavigate();
  const document = useDocument(id);

  return (
    <div>
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
        <div className="flex flex-col items-stretch gap-8 py-4">
          <div className="flex items-center gap-2">
            <ClickableText onClick={() => navigate('/')}>
              <Home />
            </ClickableText>
            <span>/</span>
            <h1>{document.data.fileName}</h1>
          </div>

          <div className="flex flex-col items-stretch gap-4">
            {document.data.pages.map((page, i) => (
              <img
                key={i}
                src={page.image.src}
                srcSet={srcSetToString(page.image.srcSet)}
                alt={page.image.alt}
                className="drop-shadow-lg"
                style={{ aspectRatio: page.aspectRatio }}
              />
            ))}
          </div>
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
