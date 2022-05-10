import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/ContextUser";
import "./CreateUser.css";

function CreateUser() {
  const { user, setUser, socket, connect } = useContext(UserContext);

  const startChat = (e) => {
    if (user.length <= 0) {
      e.preventDefault();
    } else {
      setUser(user);
    }
    connect();
    socket.on("connected", (nickname) => {
      console.log("Connected: ", nickname);
    });
  };

  return (
    <div className="createUserContainer">
      <div className="login-style">
        <h1>Skapa användare</h1>
        <form className="createUserForm">
          <div>
            <input
              onChange={(e) => setUser(e.target.value)}
              className="customizedInput"
              placeholder="Ex: Erlich Bachman"
              type="text"
              value={user}
            ></input>
          </div>
          <div>
            <Link to="/Lobby">
              <button
                disabled={user.length <= 0}
                onClick={startChat}
                className="customizedButton"
              >
                Join chat
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
