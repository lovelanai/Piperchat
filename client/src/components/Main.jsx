import { Route, Routes } from "react-router-dom";
import CreateUser from "../pages/CreateUser";
import Lobby from "../pages/Lobby";
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
