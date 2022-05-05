import { useContext } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../context/ContextUser";
import "./CreateUser.css";

function CreateUser() {
  const { user, setUser, ConnectSocket } = useContext(UserContext);
  const socket = io({ autoConnect: false });

  function setUserName() {
    socket.auth = { nickname: user.value };
    setUser(user);
    console.log(user);
    ConnectSocket();
  }

  const usernameOnChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <div className="createUserContainer">
      <h1>Skapa användare</h1>
      <div className="createUserForm">
        <div>
          <input
            value={user}
            onChange={usernameOnChange}
            className="customizedInput"
            placeholder="Ex: Erlich Bachman"
          ></input>
        </div>
        <div>
          <Link to="/Lobby">
            <button onSubmit={setUserName} className="customizedButton">
              Start Chatting
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
