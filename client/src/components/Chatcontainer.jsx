import { useEffect, useRef, useState, useContext } from "react";
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

  const scroll = document.getElementById("messages");
  // id of the chat container ---------- ^^^
  if (scroll) {
    scroll.scrollTop = scroll.scrollHeight;
  }

  return (
    <div className="chat-container">
      <div className="roomDisplay">
        <p>chatting in:</p>
        <p>{currentRoom}</p>
      </div>
      <div id="messages" className="mapped-messages">
        {allMessages.map((message, index) => (
          <div
            style={{
              display: "flex",

              margin: "1rem",
              flexDirection: "column",
            }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "3rem",
              }}
            >
              <p style={{ fontSize: "2rem", marginRight: "0.5rem" }}>
                <FaRegUserCircle />
              </p>
              <p>{message.from}</p>
            </div>
            <div
              style={{
                width: "22rem",
                background: "#5d9dad",
                borderRadius: "1rem",
                marginLeft: "3rem",
                position: "relative",
              }}
            >
              <div className="arrow-left"></div>
              <p style={{ marginLeft: "1rem", color: "white" }}>
                {message.chatMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

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
