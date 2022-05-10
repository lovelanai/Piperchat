import "./Roomnavbar.css";
import { useUser } from "../context/ContextUser";

function Roomnavbar() {
  const { setcreateNewRoom, socket } = useUser();

  const newRoom = () => {
    setcreateNewRoom(true);
  };

  // function joinRoom1(room) {
  //   socket.emit("joinRoom", room);
  //   console.log(room);
  // }

  return (
    <div className="Room-nav-container">
      <div className="containerRooms">

        <div className="rooms">Room1</div>
        <div onClick={newRoom} className="newRoom">
          Skapa nytt rum +
        </div>

      </div>
    </div>
  );
}

export default Roomnavbar;
