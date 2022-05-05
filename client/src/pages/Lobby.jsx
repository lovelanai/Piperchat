import Roomnavbar from "../components/Roomnavbar";
import Chatcontainer from "../components/Chatcontainer";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "../components/CreateRoom";
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
