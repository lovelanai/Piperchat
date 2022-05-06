import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
  socket: undefined,
  startServer: false,
  setStartServer: () => {},
});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");
  const [startServer, setStartServer] = useState(false);

  // sets nickname for session
  useEffect(() => {
    socket.auth = { nickname: user };
  }, [user]);

  // connecting to socket on join chat button
  useEffect(() => {
    if (socket.auth.nickname) {
      socket.connect();

      socket.on("welcome", (message) => {
        console.log(message);
      });

      socket.on("connect", () => {
        console.log("Connected");
      });
    }
  }, [startServer]);

  return (
    <UserContext.Provider
      value={{ user, setUser, socket, setStartServer, startServer }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextUserProvider;
