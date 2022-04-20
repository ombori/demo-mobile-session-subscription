import React, { useEffect, useState } from 'react';
import qs from 'query-string';

export default function useSessionInit() {
  const [sessionId, setSessionId] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const [newLoc, paramsString] = `${window.parent.parent.location.href}`.split('#');
      // Append the hash to avoid triggering page reloads but use replace to avoid poisioning browser history
      window.parent.parent.location.replace(`${newLoc}#`);

      const params = qs.parse(paramsString);
      const curSessionId = params.sessionId as string;
    
      if (curSessionId) {
        setSessionId(curSessionId);
        setStatus('ready');
      } else {
        setStatus('error');
      }
  }, []);

  return { sessionId, status };
}