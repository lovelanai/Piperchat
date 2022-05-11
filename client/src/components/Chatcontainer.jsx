import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";
import { FaRegUserCircle } from "react-icons/fa";

function Chatcontainer() {
  const {
    socket,
    user,
    sendMessage,
    chatMessages,
    setChatMessages,
    allMessages,
    currentRoom,
  } = useContext(UserContext);
  const [istyping, setIsTyping] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (chatMessages.length) {
      console.log(chatMessages, "här visas chatmessages");
      sendMessage(chatMessages);
      setChatMessages("");
    } else {
      return;
    }
  };

  useEffect(
    () => {
      socket.on("typing", (typingAlert) => {
        console.log("test to see if typing", typingAlert);
      });
    },
    [],
    setTimeout(setIsTyping, 5000)
  );

  return (
    <div className="chat-container">
      <h1>{currentRoom}</h1>
      {allMessages.map((message, index) => (
        <div key={index}>
          <p>
            <FaRegUserCircle />
            {message.from} {message.chatMessage}
          </p>
        </div>
      ))}

      <div className="messageFeild">
        {istyping ? (
          <div>
            <p>{user} is typing...</p>
          </div>
        ) : null}
        <br></br>
        <form className="chatInput">
          <input
            value={chatMessages || ""}
            type="message"
            name="message"
            onChange={(e) => setChatMessages(e.target.value)}
            onKeyDown={() => setIsTyping(true)}
          />
          <button onClick={HandleSubmit}>send</button>

          {/* <button onClick={test}>test</button> */}
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
