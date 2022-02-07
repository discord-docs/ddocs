import Router, { useRouter } from "next/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Author from "../../lib/api-models/author";
import { Intents } from "../../lib/packets/intents";
import { OpCode } from "../../lib/packets/opcode";
import { Packet } from "../../lib/packets/packet";
import useStatePromise from "../../lib/useStateAsync";
import { useAuth } from "./AuthContext";

const SocketUrl: string = "ws://localhost:8080/socket";

export type WebsocketContextType = {
  isConnected: boolean;
  send: (packet: Packet) => Promise<void>;
  addIntentListener: (
    intent: Intents,
    callback: (packet: Packet) => void
  ) => void;
  removeIntentListener: (callback: (packet: Packet) => void) => void;
  users: Author[];
};

export const SocketContext = React.createContext<WebsocketContextType>({
  isConnected: false,
  send: () => new Promise<void>((_, __) => {}),
  addIntentListener: (_: Intents, __: (data: any) => void) => {},
  removeIntentListener: (_: (data: any) => void) => {},
  users: [],
});

export const useWebsocket = () => useContext(SocketContext);

interface WebsocketContextProps {}

const WebsocketContext: FunctionComponent<WebsocketContextProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const [intents, setIntents] = useState<Intents>(Intents.None);
  const [users, setUsers] = useState<Author[]>([]);
  const [eventListeners, setEventListeners] = useState<
    { intents: Intents; callback: (data: any) => void }[]
  >([]);

  const router = useRouter();
  const auth = useAuth();

  const updateServer = async () => {
    if (isConnected) {
      await sendPacket({
        op: OpCode.SwitchingPage,
        p: {
          page: router.asPath,
        },
      });

      await sendPacket({
        op: OpCode.GetUsers,
        p: {},
      });
    }
  };

  const sendPacket = async (packet: Packet, localSocket?: WebSocket) => {
    localSocket ??= socket;
    if (!localSocket) {
      console.log(localSocket, socket);
      return;
    }
    localSocket.send(JSON.stringify(packet));
  };

  const connect = async () => {
    if (!auth.isAuthenticated || !auth.account?.jwt) {
      return;
    }

    const ws = new WebSocket(SocketUrl);

    // set the state
    setSocket(ws);

    await new Promise<void>((resolve) => {
      ws.onopen = () => {
        console.log("open");
        resolve();
      };
    });

    console.log("socket open, sending handshake");

    // send handshake
    await sendPacket(
      {
        op: OpCode.Identify,
        p: {
          token: auth.account.jwt,
          events: intents,
          page: router.asPath,
        },
      },
      ws
    );

    console.log("handshake sent");

    // start heartbeat
    heartbeat(ws);

    ws.onmessage = handleMessage;
    ws.onclose = handleDisconnect;

    setIsConnected(true);
  };

  const handleDisconnect = (ev: CloseEvent) => {
    console.log("socket disconnected");
    setIsConnected(false);
    setSocket(undefined);
  };

  const heartbeat = (ws: WebSocket) => {
    const interval = setInterval(
      () =>
        (async () => {
          if (ws.readyState !== ws.OPEN) {
            console.log("heartbeat failed, not connected", ws);
            clearInterval(interval);
            return;
          }

          await sendPacket(
            {
              op: OpCode.Heartbeat,
              p: {},
            },
            ws
          );
          console.log("heartbeat sent");
        })(),
      30000
    );
  };

  const handleMessage = async (data: MessageEvent<any>) => {
    const packet = JSON.parse(data.data) as Packet;

    switch (packet.op) {
      case OpCode.Event: {
        eventListeners
          .filter((x) => x.intents & packet.p.t)
          .forEach((x) => x.callback(packet.p.p));
        break;
      }
      case OpCode.Users: {
        setUsers(packet.p.users as Author[]);
        break;
      }
    }
  };

  const addIntentListener = (
    intents: Intents,
    callback: (data: any) => void
  ) => {
    const newListeners = eventListeners.concat({ intents, callback });
    setEventListeners(newListeners);
    setIntents(
      newListeners.reduce(
        (acc, listener) => acc | listener.intents,
        Intents.None
      )
    );
  };

  const removeIntentListener = (callback: (data: any) => void) => {
    const newListeners = eventListeners.filter(
      (listener) => listener.callback !== callback
    );
    setEventListeners(newListeners);
    setIntents(
      newListeners.reduce(
        (acc, listener) => acc | listener.intents,
        Intents.None
      )
    );
  };

  useEffect(() => {
    if (isConnected) {
      updateServer();
    }
  }, [router.asPath]);

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [auth.isAuthenticated]);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        addIntentListener,
        removeIntentListener,
        send: sendPacket,
        users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default WebsocketContext;
