import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export default function useChatSocket ({ onMessageReceived, userId }) {
  const connectionRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://aevoria-back-production.up.railway.app/appHub')
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveChatMessage', (fromUserId, content) => {
      if (onMessageReceived) onMessageReceived({ fromUserId, content });
    });

    connection.start().catch(console.error);
    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [userId, onMessageReceived]);

  // Pour envoyer un message
  const sendMessage = (toUserId, content) => {
    if (connectionRef.current) {
      connectionRef.current.invoke('SendChatMessage', userId, toUserId, content);
    }
  };

  return { sendMessage };
}
