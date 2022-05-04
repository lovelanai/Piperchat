import "./Chatcontainer.css";
import { io, Socket } from "socket.io-client";
import { useState } from "react";

function Chatcontainer() {
  const socket = io();
  const [value, setValue] = useState("");

  function connectSocket(param) {
    socket.emit("message", param);
    console.log(value);
    // socket.connect();
  }

  const valueOnChange = (e) => {
    setValue(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    connectSocket(value);
  };

  return (
    <div className="chat-container">
      <h1>Messages</h1>
      <div className="messageFeild">
        <form>
          <label>
            text message
            <input type="text" name="message" onChange={valueOnChange} />
          </label>
          <button onClick={HandleSubmit}> send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
