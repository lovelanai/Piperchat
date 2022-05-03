import "./Chatcontainer.css";

function Chatcontainer() {
  return (
    <div className="chat-container">
      <h1>Messages</h1>
      <div className="messageFeild">
        <form>
          <label>
            text message
            <input type="text" name="message" />
          </label>
          <button onClick> send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatcontainer;
