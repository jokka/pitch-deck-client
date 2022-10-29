import { ReactNode, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useAtomValue } from 'jotai';
import sessionTokenAtom from '../session/sessionTokenAtom';
import ServerEvent from './ServerEvent';
import { useQueryClient } from '@tanstack/react-query';
import Document from '../model/Document';
import Page from '../model/Page';

interface EventListenerProps {
  children: ReactNode;
}

const EventListener = ({ children }: EventListenerProps) => {
  const sessionToken = useAtomValue(sessionTokenAtom);

  return sessionToken ? (
    <Listen sessionToken={sessionToken}>{children}</Listen>
  ) : (
    <>{children}</>
  );
};

export default EventListener;

interface ListenProps {
  sessionToken: string;
  children: ReactNode;
}

const Listen = ({ sessionToken, children }: ListenProps) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:9000/events',
    {
      shouldReconnect: () => true,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    try {
      const json = JSON.parse(lastMessage.data);
      const serverEvent = ServerEvent.parse(json);

      switch (serverEvent.is) {
        case 'Snapshot':
          queryClient.setQueryData(['documents'], serverEvent.documents);
          break;
        case 'DocumentCreated':
          queryClient.invalidateQueries(['documents']);
          queryClient.setQueryData(
            ['documents', serverEvent.document.id],
            serverEvent.document
          );
          break;
        case 'PageSrcUpdated':
          queryClient.setQueryData(
            ['documents', serverEvent.documentId],
            updatePage(serverEvent.documentId, serverEvent.pageIndex, page => ({
              ...page,
              src: serverEvent.src,
            }))
          );
          break;
        case 'SrcSetEntryAdded':
          queryClient.setQueryData(
            ['documents', serverEvent.documentId],
            updatePage(serverEvent.documentId, serverEvent.pageIndex, page => ({
              ...page,
              srcSet: {
                ...page.srcSet,
                [serverEvent.entry[0]]: serverEvent.entry[1],
              },
            }))
          );
          break;
      }
    } catch (e) {
      console.warn('Received unexpected server event', lastMessage);
    }
  }, [lastMessage, queryClient]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(sessionToken);
    }
  }, [readyState, sendMessage, sessionToken]);

  return <>{children}</>;
};

function updatePage(
  documentId: string,
  pageIndex: number,
  fn: (page: Page) => Page
) {
  return (entry: unknown) => {
    if (!entry) {
      return entry;
    }

    try {
      const document = Document.parse(entry);

      if (document.pages.length <= pageIndex) {
        return entry;
      }

      const pages = [...document.pages];

      pages[pageIndex] = fn(pages[pageIndex]);

      return {
        ...document,
        pages,
      };
    } catch (e) {
      console.warn(
        'Got unexpected value while trying to update page',
        ['documents', documentId],
        entry,
        e
      );
    }

    return entry;
  };
}
