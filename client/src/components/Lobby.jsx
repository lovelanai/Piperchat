import Roomnavbar from "./Roomnavbar";
import Chatcontainer from "./Chatcontainer";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import "./Lobby.css";

function Lobby() {
  return (
    <div className="lobby-container">
      <div className="roomNavBar">
        <Roomnavbar />
      </div>
      <div className="chatContainer">
        <Chatcontainer />
      </div>
    </div>
  );
}

export default Lobby;
