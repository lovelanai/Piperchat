import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";

function Chatcontainer() {
  const [message, setMessage] = useState("");
  const { socket, user } = useContext(UserContext);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (message.length) {
      console.log(message);
      socket.emit("message", message);
      setMessage("");
    } else {
      return;
    }
  };

  useEffect(() => {
    const listener = (messageData) => {
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
        <form className="chatInput">
          <input
            value={message}
            type="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={HandleSubmit}>send</button>

          {/* <button onClick={test}>test</button> */}
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
