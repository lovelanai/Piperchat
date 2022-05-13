import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

function Chatcontainer() {
  const {
    socket,
    user,
    sendMessage,
    chatMessages,
    setChatMessages,
    allMessages,
    currentRoom,
    whoIsTyping,
    setWhoIsTyping,
    sendIsTyping,
  } = useContext(UserContext);
  // const [istyping, setIsTyping] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (chatMessages.length) {
      console.log(chatMessages, "här visas chatmessages");
      sendMessage(chatMessages);
      setChatMessages("");
      sendIsTyping(false);
    } else {
      return;
    }
  };

  // scroll to bottom of chat on every new message
  useEffect(() => {
    const scroll = document.getElementById("messages");
    // id of the chat container ---------- ^^^
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [allMessages, whoIsTyping]);

  return (
    <div>
      <div className="chat-container">
        <div className="roomDisplay">
          <p>{currentRoom}</p>
        </div>

        <div id="messages" className="mapped-messages">
          {allMessages.map((message, index) => (
            <div key={index}>
              {user === message.from ? (
                <div style={{ margin: "1rem" }}>
                  <div className="messageInfo">
                    <p
                      style={{
                        fontSize: "2rem",
                        marginRight: "0.5rem",
                        color: "#027281",
                      }}
                    >
                      <FaRegUserCircle />
                    </p>
                    <p>{message.from}</p>
                  </div>
                  <div style={{ background: "#007281" }} className="chatBubble">
                    <div className="arrow-left-me"></div>
                    <p>{message.chatMessage} </p>
                  </div>
                </div>
              ) : (
                <div style={{ margin: "1rem" }}>
                  <div className="messageInfo">
                    <p
                      style={{
                        fontSize: "2rem",
                        marginRight: "0.5rem",
                        color: "#2A9376",
                      }}
                    >
                      <FaRegUserCircle />
                    </p>
                    <p>{message.from}</p>
                  </div>
                  <div className="chatBubble">
                    <div className="arrow-left"></div>
                    <p>{message.chatMessage} </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {whoIsTyping ? (
            <div
              style={{ position: "absolute", left: "1rem", color: "#334B48" }}
            >
              <p>{whoIsTyping}</p>
            </div>
          ) : null}
        </div>
      </div>

      <form className="chatInput">
        <input
          value={chatMessages || ""}
          type="message"
          name="message"
          onChange={(e) => {
            setChatMessages(e.target.value);
            sendIsTyping(e.target.value);
          }}
        />
        <button onClick={HandleSubmit}>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
}

export default Chatcontainer;
