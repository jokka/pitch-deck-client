import PageModel, { srcSetToString } from '../model/Page';
import Spinner from './graphics/Spinner';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import configAtom from '../state/configAtom';
import { AnimatePresence, motion } from 'framer-motion';
import ExclamationTriangle from './graphics/ExclamationTriangle';

interface SlideProps {
  page: PageModel;
  className?: string;
}

const Page = ({ page, className }: SlideProps) => {
  const { assetsUrl } = useAtomValue(configAtom);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };
  const handleError = () => setError(true);

  return (
    <div
      className={clsx(className, 'bg-white flex-1 relative')}
      style={{ aspectRatio: page.aspectRatio }}
    >
      <AnimatePresence initial={false}>
        {page.src.is === 'Completed' && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            loading="lazy"
            src={assetsUrl + page.src.value}
            srcSet={srcSetToString(assetsUrl, page.srcSet)}
            alt={page.alt}
            className="absolute inset-0"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        {!loaded && !error && page.src.is !== 'Failed' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Spinner />
          </motion.div>
        )}
        {(page.src.is === 'Failed' || error) && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-1">
              <ExclamationTriangle />
              <p>
                {error
                  ? 'Failed to load the page.'
                  : 'Failed to render the page.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
