import Roomnavbar from "../components/Roomnavbar";
import Chatcontainer from "../components/Chatcontainer";
import { Routes, Route } from "react-router-dom";
import "./Lobby.css";
import { useState } from "react";

function Lobby() {
  const [test, setTest] = useState(false);

  const demo = () => {
    setTest(true);
  };

  return (
    <div className="lobby-container">
      {!test ? (
        <div className="createRoomContainer">
          <div className="createRoom">
            <h1>Create a new room</h1>
            <input
              className="customizedInput"
              placeholder="Ex: vi som älskar bolibompa"
            ></input>
            <div className="createRoomButton">
              <button className="customizedButton">Create Room</button>
              <p>or</p>
              <button className="customizedButton" onClick={demo}>
                Join a room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="roomNavBar">
            <Roomnavbar />
          </div>

          <div className="chatContainer">
            <Chatcontainer />
          </div>
        </>
      )}
    </div>
  );
}

export default Lobby;
