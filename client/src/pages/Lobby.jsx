import Roomnavbar from "../components/Roomnavbar";
import Chatcontainer from "../components/Chatcontainer";
import "./Lobby.css";
import { useState } from "react";
import { useUser } from "../context/ContextUser";

function Lobby() {
  const [roomSelector, setRoomSelector] = useState(false);
  const [roomName, setRoomName] = useState("");
  const { createAndJoinRoom, createNewRoom, setcreateNewRoom } = useUser();

  const roomSubmit = (e) => {
    e.preventDefault();
    createAndJoinRoom(roomName);
    setRoomName("");
    setcreateNewRoom(false);
  };

  return (
    <div className="lobby-container">
      <div className="roomNavBar">
        <Roomnavbar />
      </div>
      {createNewRoom ? (
        <div className="createRoomContainer">
          <div className="createRoom">
            <form className="room-form">
              <h1>Create new room</h1>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="customizedInput"
              ></input>
              <div className="createRoomButton">
                <button
                  disabled={roomName.length <= 0}
                  type="submit"
                  onClick={roomSubmit}
                  className="customizedButton"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="chatContainer">
            <Chatcontainer />
          </div>
        </>
      )}
      <div className="roomNavBar"></div>
    </div>
  );
}

export default Lobby;
