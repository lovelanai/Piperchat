import CreateUser from "./CreateUser";
import Roomnavbar from "./Roomnavbar";
import Chatcontainer from "./Chatcontainer";
import { Routes, Route } from "react-router-dom";
import Lobby from "./Lobby";
import CreateRoom from "./CreateRoom";
import "./Main.css";

function Main() {
  return (
    <div className="mainContainer">
      <div>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/Lobby" element={<Lobby />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
