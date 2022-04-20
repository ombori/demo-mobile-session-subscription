import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSettings } from '@ombori/ga-settings';
import { useStatus, useSubscribe, usePublish, setDefaultChannel } from '@ombori/ga-messaging';
import { Settings } from './schema';

// connect to anonymous message bus on the same grid-os host
setDefaultChannel(`mobileapp`);

function App() {
  const settings = useSettings<Settings>();
  const connected = useStatus();
  const pub = usePublish();
  const [pongReceived, setPongReceived] = useState<Boolean>(false);

  // send ping message when button is pressed
  const ping = useCallback(() => {
    pub('Test.ping', { hello: 'from mobile app' });
  }, [pub]);

  // subscribe to pong message
  useSubscribe('Test.pong', async (data) => {
    console.log('Pong received', data);

    // blink background
    setPongReceived(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setPongReceived(false);
  }, [setPongReceived]);

  if (!settings) return <div>Loading settings...</div>
  if (!connected) return <div>Connecting...</div>

  return (
    <Container active={pongReceived}>
      <Button onClick={ping}>Ping</Button>
    </Container>
  );
}

const Container = styled.div<{ active: Boolean }>`
  width: 100vw; 
  height: 100vh; 
  display: flex;
  align-items: center; 
  justify-content: center;
  background: ${(({ active }) => active ? 'green' : "white")}
`;

const Button = styled.button`
  width: 50vw;
  height: 50vh;
`;

export default App;
