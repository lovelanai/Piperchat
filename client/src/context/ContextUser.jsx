import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
  socket: undefined,
});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    socket.auth = { nickname: user };
    socket.connect();

    socket.on("welcome", (message) => {
      console.log(message);
    });

    socket.on("connect", () => {
      console.log("kopplad");

      // socket.emit("message");
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, socket }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextUserProvider;
