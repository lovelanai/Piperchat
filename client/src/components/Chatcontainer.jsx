import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";

function Chatcontainer() {
  const [text, setText] = useState("");
  const { socket, user } = useContext(UserContext);

  function RandomID() {
    let id = Math.random() * 1.98;
    return id;
  }

  // const valueOnChange = (e) => {
  //   setValue(e.target.value);
  // };

  const HandleSubmit = (e) => {
    e.preventDefault();

    setText(text);

    console.log(text);
    setText("");
    socket.emit("message", text);
  };

  // const test = (e) => {
  //   e.preventDefault();
  //   socket.on("message", (messageData) => {
  //     console.log("FROM SERVER", messageData);
  //   });
  // };

  useEffect(() => {
    socket.on("message", (messageData) => {
      console.log("FROM SERVER", messageData);
    });
  }, [text]);

  return (
    <div className="chat-container">
      <h1>Messages</h1>
      Här ska mappningen vara senare
      {/* {text.map((text) => (
        <div key={text.id}>
          <h2>
            <span style={{ paddingRight: "1rem" }}>{text.name}:</span>
            <span>{text.message}</span>
          </h2>
        </div>
      ))} */}
      <div className="messageFeild">
        <form>
          <label>
            text message
            <input
              value={text}
              type="text"
              name="message"
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button onClick={HandleSubmit}>send</button>

          {/* <button onClick={test}>test</button> */}
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
