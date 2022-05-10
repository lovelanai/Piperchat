import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";

function Chatcontainer() {
  const [message, setMessage] = useState("");
  const { socket, user, sendMessage } = useContext(UserContext);
  const [istyping, setIsTyping] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (message.length) {
      console.log(message);
      sendMessage(message);
      setMessage("");
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

  useEffect(() => {
    const listener = (messageData) => {
      // setMessages(messageData);
      console.log("FROM SERVER", messageData);
    };
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <h1>Messages</h1>
      du måste joina ett rum för att chatta
      {/* {message.map((message) => (
        <div key={message.id}>
          <h2>
            <span style={{ paddingRight: "1rem" }}>{message.name}:</span>
            <span>{message.message}</span>
          </h2>
        </div>
      ))} */}
      <div className="messageFeild">
        {istyping ? (
          <div>
            <p>{user} is typing...</p>
          </div>
        ) : null}
        <br></br>
        <form className="chatInput">
          <input
            value={message}
            type="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
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
