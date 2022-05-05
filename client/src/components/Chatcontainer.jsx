import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/ContextUser";
import "./Chatcontainer.css";

function Chatcontainer() {
  const [value, setValue] = useState("");
  const [text, setText] = useState([]);
  const { socket, user } = useContext(UserContext);

  function RandomID() {
    let id = Math.random() * 1.98;
    return id;
  }

  const valueOnChange = (e) => {
    setValue(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let text = {
      name: user,
      message: value,
    };
    console.log(text);
    socket.emit("message", text);
  };

  useEffect(() => {
    socket.emit("message", "Funkar");
  }, []);

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
