import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
  socket: undefined,
  connect: () => {},
  rooms: [],
  createNewRoom: Boolean,
  setcreateNewRoom: () => {},
  currentRoom: undefined,
  joinRoom: () => {},
  sendMessage: () => {},
  setChatMessages: () => {},
  chatMessages: "",
  setAllMessages: () => {},
  allMessages: [],
});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");
  const [createNewRoom, setcreateNewRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [allMessages, setAllMessages] = useState();

  // sets nickname for session
  useEffect(() => {
    socket.auth = { nickname: user };
  }, [user]);

  // connecting to socket on join chat button
  const connect = () => {
    if (socket.auth.nickname) {
      socket.connect();

      socket.on("welcome", (message) => {
        console.log(message);
      });

      socket.on("connect", () => {
        console.log("Connected");
      });
    }
  };

  const joinRoom = (roomName) => {
    if (currentRoom) {
      socket.emit("leave", currentRoom);
    }
    socket.emit("join", roomName);
    setCurrentRoom(roomName);
    setChatMessages([]);
  };

  const sendMessage = (message) => {
    socket.emit("message", message, currentRoom);
  };

  useEffect(() => {
    const listener = (messageData) => {
      setAllMessages(messageData);
      console.log("ALL MESSAGES FROM SERVER", allMessages);
      console.log("FROM SERVER", messageData);
    };
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        socket,
        connect,
        rooms,
        createNewRoom,
        setcreateNewRoom,
        currentRoom,
        joinRoom,
        sendMessage,
        chatMessages,
        setChatMessages,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default ContextUserProvider;
