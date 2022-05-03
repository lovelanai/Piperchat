import "./CreateUser.css";
import { Link } from "react-router-dom";
import CreateRoom from "./CreateRoom";

function CreateUser() {
  return (
    <div className="createUserContainer">
      <h1>Skapa användare</h1>
      <div className="createUserForm">
        <div>
          <input
            className="customizedInput"
            placeholder="Ex: Erlich Bachman"
          ></input>
        </div>
        <div>
          <input className="customizedInput" placeholder="image url"></input>
        </div>
        <div>
          <Link to="/Lobby">
            <button className="customizedButton">Start Chatting</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
