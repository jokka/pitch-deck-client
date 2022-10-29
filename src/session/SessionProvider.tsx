import React, { ReactNode, useEffect } from 'react';
import useCreateSession from './useCreateSession';
import { useAtom } from 'jotai';
import sessionTokenAtom from './sessionTokenAtom';
import useVerifySession from './useVerifySession';
import Spinner from '../components/graphics/Spinner';
import ExclamationTriangle from '../components/graphics/ExclamationTriangle';
import ClickableText from '../components/ClickableText';

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [sessionToken, setSessionToken] = useAtom(sessionTokenAtom);

  const verifySession = useVerifySession();
  const createSession = useCreateSession();

  const callVerifySession = verifySession.mutateAsync;
  const callCreateSession = createSession.mutateAsync;

  useEffect(() => {
    if (sessionToken) {
      (async () => {
        try {
          await callVerifySession(sessionToken);
        } catch (e) {
          setSessionToken(null);
        }
      })();
    } else {
      (async () => {
        const session = await callCreateSession();
        setSessionToken(session.sessionToken);
      })();
    }
  }, [callCreateSession, callVerifySession, sessionToken, setSessionToken]);

  useEffect(() => {
    if (createSession.data) {
      setSessionToken(createSession.data?.sessionToken);
    }
  }, [createSession.data, setSessionToken]);

  return sessionToken && verifySession.isSuccess ? (
    <>{children}</>
  ) : createSession.isError ? (
    <div className="max-w-screen-md mx-auto my-4">
      <div className="flex flex-col items-stretch gap-8 py-4">
        <div className="flex items-center gap-1">
          <ExclamationTriangle />
          <p>Failed to obtain session token.</p>
          <ClickableText onClick={() => createSession.mutate()}>
            Try again
          </ClickableText>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-screen-md mx-auto my-4">
      <div className="flex flex-col items-stretch gap-8 py-4">
        <div className="flex items-center gap-1">
          <Spinner />
          <p>Obtaining session token…</p>
        </div>
      </div>
    </div>
  );
};

export default SessionProvider;
