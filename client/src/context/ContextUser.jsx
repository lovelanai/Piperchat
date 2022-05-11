import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

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
  allMessages: [{}],
  newRoom: () => {},
  joinAvalibleRoom: () => {},
});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");
  const [createNewRoom, setcreateNewRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const navigate = useNavigate();
  // sets nickname for session
  useEffect(() => {
    socket.auth = { nickname: user };
    if (user.length === 0) {
      console.log("ingen inloggad");
      navigate("/");
    }
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

  // creating rooms
  useEffect(() => {
    const listener = (roomsData) => {
      console.log(roomsData);
      setRooms(roomsData);
    };
    socket.on("room-list", listener);

    return () => {
      socket.off("room-list", listener);
    };
  }, []);

  // render create room input and join created room
  const newRoom = () => {
    setcreateNewRoom(true);
    socket.on("joined", (room) => {
      console.log("Joined room:", room);
    });
  };

  const joinAvalibleRoom = (e) => {
    const joinedroom = e.target.value;
    setCurrentRoom(joinedroom);
    socket.emit("leave", currentRoom);
    socket.emit("join", joinedroom);
    setAllMessages([]);
    setcreateNewRoom(false);
  };

  // join a room
  const joinRoom = (roomName) => {
    if (currentRoom) {
      socket.emit("leave", currentRoom);
    }
    socket.emit("join", roomName);
    setCurrentRoom(roomName);
    setcreateNewRoom(false);
    setAllMessages([]);
  };

  const sendMessage = (message) => {
    socket.emit("message", message, currentRoom);
  };

  useEffect(() => {
    const listener = (messageData) => {
      let messageObject = {
        chatMessage: messageData.chatMessage,
        from: messageData.from + ":",
        room: messageData.room,
      };
      setAllMessages((allMessages) => [...allMessages, messageObject]);
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
        allMessages,
        newRoom,
        joinAvalibleRoom,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default ContextUserProvider;
