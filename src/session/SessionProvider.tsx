import { ReactNode, useEffect } from 'react';
import useCreateSession from './useCreateSession';
import { useAtom } from 'jotai';
import sessionTokenAtom from './sessionTokenAtom';
import useVerifySession from './useVerifySession';

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

  return sessionToken && verifySession.isSuccess ? (
    <>{children}</>
  ) : createSession.isError ? (
    <div>
      <p>Failed to obtain session token.</p>
      <button>Try again</button>
    </div>
  ) : (
    <div>
      <p>Obtaining session token</p>
    </div>
  );
};

export default SessionProvider;
