import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");

  function ConnectSocket() {
    socket.connect();
  }

  useEffect(() => {
    ConnectSocket();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ConnectSocket }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextUserProvider;
