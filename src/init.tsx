import React, { useEffect } from 'react';
import { useGridSignals } from '@ombori/grid-signals-react';
import qs from 'query-string';
import App from './App';
import useSessionInit from './use-session-init';

const InitAppWithSignals = ({ sessionId }: { sessionId: string }) => {
  const isSignalsReady = useGridSignals({
    sessionId,
    env: 'PROD',
    spaceId: '61b7882aa0f0030007d9e918',
  });

  if (!isSignalsReady) {
    return <div className='init'>Initializing App...</div>
  }

  return <App />
}
const Init = () => {
  const { sessionId, status } = useSessionInit();

  switch(status) {
    case 'error':
      return <div>Error: No sessionId found in URL</div>
    case 'loading':
      return <div>Loading...</div>;
    case 'ready':
      return <InitAppWithSignals sessionId={sessionId} />;
    default:
      return <div>Unknown status</div>;
  }
}

export default Init;
