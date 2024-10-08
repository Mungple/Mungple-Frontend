import { Client } from '@stomp/stompjs';
import { useState, useEffect } from 'react';

import { getAccessToken } from '@/api';
import { useAppStore } from '@/state/useAppStore';
import { Distance, FromZone } from '@/types';

export interface ErrorMessage {
  errorCode: string;
  message: string;
}

// WebSocket 서버 URI
const WEBSOCKET_URI = 'wss://j11e106.p.ssafy.io/api/ws';

const useWebSocket = (explorationId: number = -1) => {
  const setIsSocket = useAppStore((state) => state.setIsSocket);
  const setDistance = useAppStore((state) => state.setDistance);
  const clientSocket = useAppStore((state) => state.clientSocket);
  const setClientSocket = useAppStore((state) => state.setClientSocket);
  const [explorations, setExplorations] = useState<ErrorMessage | null>(null);
  const [allBlueZone, setAllBlueZone] = useState<FromZone | null>(null);
  const [allRedZone, setAllRedZone] = useState<FromZone | null>(null);
  const [myBlueZone, setMyBlueZone] = useState<FromZone | null>(null);
  const [mungZone, setMungZone] = useState<Array<{lat : number ; lon: number}> | null>(null);

  // 소켓 연결 시도
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const token = await getAccessToken();

        const socket = new Client({
          webSocketFactory: () => new WebSocket(`${WEBSOCKET_URI}?Authorization=${token}`),
          beforeConnect: () => {
            console.log('useWebSocket >>> 소켓 연결 시도 중');
          },
          appendMissingNULLonIncoming: true, // 서버로부터 받은 메시지에 NULL 문자가 없을 때 추가(RN Polyfill)
          forceBinaryWSFrames: true, // WebSocket 프레임을 항상 바이너리로 설정(RN Polyfill)
          reconnectDelay: 5000, // 재연결 시도 간격
          heartbeatIncoming: 4000, // 서버로부터 메시지를 받는 주기
          heartbeatOutgoing: 4000, // 서버로 메시지를 보내는 주기

          onConnect: () => {
            setClientSocket(socket);
            subscribeToTopics(socket, explorationId);
            setIsSocket(true);
            console.log('useWebSocket >>> 소켓 연결 성공 | explorationId =', explorationId);
          },
          onStompError: (frame) => {
            console.error('useWebSocket >>> 소켓 연결 에러 발생:', frame.headers['message']);
          },
        });

        socket.activate();
      } catch (error) {
        console.error('useWebSocket >>> 웹 소켓 에러 발생 :', error);
      }
    };

    if (!clientSocket) {
      connectWebSocket();
    }

    return () => {
      if (clientSocket) {
        clientSocket.deactivate();
        setClientSocket(null);
      }
    };
  }, []);

  const subscribeToTopics = (socket: Client, explorationId: number) => {
    // 에러 메시지 수신
    socket.subscribe('/user/sub/errors', () => {
      console.error('useWebSocket >>> Error message received');
    });

    // 산책 기록 위치 수집
    socket.subscribe(`/user/sub/explorations/${explorationId}`, (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as ErrorMessage;
        setExplorations(parsedMessage);
      } catch (e) {
        console.error('useWebSocket for exploration >>>', e);
      }
    });
    // 개인 블루존 조회
    socket.subscribe('/user/sub/users/bluezone', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as FromZone;
        setMyBlueZone(parsedMessage);
      } catch (e) {
        console.error('useWebSocket for myBluezone >>>', e);
      }
    });
    // 전체 블루존 조회
    socket.subscribe('/user/sub/bluezone', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as FromZone;
        setAllBlueZone(parsedMessage);
      } catch (e) {
        console.error('useWebSocket for bluezone >>>', e);
      }
    });
    // 전체 레드존 조회
    socket.subscribe('/user/sub/redzone', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as FromZone;
        setAllRedZone(parsedMessage);
      } catch (e) {
        console.error('useWebSocket for redzone >>>', e);
      }
    });
    // 멍플 조회
    socket.subscribe('/user/sub/mungple', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as Array<{lat: number; lon: number}>;
        setMungZone(parsedMessage);
      } catch (e) {
        console.error('useWebSocket for mungplace >>>', e);
      }
    });
    // 산책 거리 조회
    socket.subscribe('/user/sub/explorations/distance', (message) => {
      try {
        const parsedMessage = JSON.parse(message.body) as Distance;
        setDistance(Math.max(parsedMessage.distance ?? 0, 0));
      } catch (e) {
        console.error('useWebSocket for distance >>>', e);
      }
    });
  };

  return {
    explorations,
    myBlueZone,
    allBlueZone,
    allRedZone,
    mungZone,
  };
};

export default useWebSocket;
