import "./Roomnavbar.css";
import { useUser } from "../context/ContextUser";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Roomnavbar() {
  const { newRoom, joinRoom, rooms, currentRoom, joinAvalibleRoom } = useUser();

  return (
    <div className="Room-nav-container">
      <div className="desktop-nav">
        {" "}
        <h2>Rooms</h2>
        <div className="containerRooms">
          {rooms.map((room, index) => (
            <div key={index}>
              <button
                className="roomsButtons"
                disabled={currentRoom === room}
                value={room || ""}
                onClick={joinAvalibleRoom}
              >
                {room}
              </button>
            </div>
          ))}
          <div>
            <button onClick={newRoom} className="roomsButtons">
              <span>Skapa nytt rum</span>{" "}
              <AiOutlinePlusCircle style={{ marginLeft: "0.2rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className="mobile-nav">
        <Navbar
          style={{ justifyContent: "center" }}
          collapseOnSelect
          expand="lg"
          variant="dark"
        >
          <Navbar.Brand>
            <h2>Chatrooms</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <div className="containerRooms">
                {rooms.map((room, index) => (
                  <div key={index}>
                    <button
                      className="roomsButtons"
                      disabled={currentRoom === room}
                      value={room || ""}
                      onClick={joinAvalibleRoom}
                    >
                      {room}
                    </button>
                  </div>
                ))}
                <div>
                  <button onClick={newRoom} className="roomsButtons">
                    <span>Skapa nytt rum</span>{" "}
                    <AiOutlinePlusCircle style={{ marginLeft: "0.2rem" }} />
                  </button>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Roomnavbar;
