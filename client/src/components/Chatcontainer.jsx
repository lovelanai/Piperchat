import "./Chatcontainer.css";
import { io, Socket } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";

function Chatcontainer() {
  const [value, setValue] = useState("");
  const [text, setText] = useState([]);
  const socket = io({ autoConnect: false });

  function connectSocket(param) {
    socket.emit("message", param);
    console.log(value);
    socket.connect();
  }

  function RandomID() {
    let id = Math.random() * 1.98;
    return id;
  }

  const valueOnChange = (e) => {
    setValue(e.target.value);
  };

  // const onSubmiText = (e) => {
  //   e.preventDefault();
  //   console.log("you sent a message");
  //   // HandleSubmit();
  // };

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    let message = {
      user: "",
      message: value,
      id: RandomID,
    };
    text.push(message);
    connectSocket(message);
    console.log(message);
    setText(text);
  };

  // let mesages = JSON.parse(localStorage.getItem("messages"));

  useEffect(() => {
    localStorage.setItem("Messages", JSON.stringify(text));
  }, [text]);

  return (
    <div className="chat-container">
      <h1>Messages</h1>
      {text.map((text) => (
        <div key={text.id}>
          {text.user}
          <h2 key={text.id}>{text.message}</h2>
        </div>
      ))}
      <div className="messageFeild">
        <form>
          <label>
            text message
            <input type="text" name="message" onChange={valueOnChange} />
          </label>
          <button onClick={HandleSubmit} type="submit">
            send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
