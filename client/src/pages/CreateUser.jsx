import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/ContextUser";
import "./CreateUser.css";

function CreateUser() {
  const { user, setUser, socket } = useContext(UserContext);
  // let nickname = user.value;

  const setUserName = (e) => {
    setUser(user);
    console.log(user);
  };

  socket.on("connected", (nickname) => {
    console.log("Connected: ", nickname);
    nickname = nickname;
  });

  return (
    <div className="createUserContainer">
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
            <button onClick={setUserName} className="customizedButton">
              Join chat
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
