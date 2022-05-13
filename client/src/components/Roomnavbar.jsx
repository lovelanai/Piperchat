import "./Roomnavbar.css";
import { useUser } from "../context/ContextUser";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Roomnavbar() {
  const {
    newRoom,
    joinRoom,
    rooms,
    currentRoom,
    joinAvalibleRoom,
    createNewRoom,
  } = useUser();

  return (
    <div className="Room-nav-container">
      <div className="desktop-nav">
        {" "}
        <h2 style={{ color: "white", marginLeft: "0.5rem" }}>Rooms</h2>
        <div className="containerRooms">
          {rooms.map((room, index) => (
            <div key={index}>
              <button
                className="roomsButtons"
                disabled={currentRoom === room && !createNewRoom}
                value={room || ""}
                onClick={joinAvalibleRoom}
              >
                {room}
              </button>
            </div>
          ))}
          <div>
            <button
              onClick={newRoom}
              className="roomsButtons"
              style={{ background: "#0E847B" }}
            >
              <span>Skapa nytt rum</span>{" "}
              <AiOutlinePlusCircle style={{ marginLeft: "0.2rem" }} />
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <Navbar
          style={{ justifyContent: "center", margin: "0 1rem" }}
          collapseOnSelect
          expand="lg"
          variant="dark"
        >
          <Navbar.Brand>
            <h2>Chatrooms</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            style={{
              position: "absolute",
              width: "100%",
              top: "3.5rem",
              zIndex: "10",
            }}
            id="responsive-navbar-nav"
          >
            <Nav className="mr-auto">
              <div className="containerRooms">
                {rooms.map((room, index) => (
                  <div key={index}>
                    <Navbar.Toggle
                      style={{
                        borderRadius: "0px",
                        color: "white",
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                      }}
                      aria-controls="responsive-navbar-nav"
                      className="roomsButtons"
                      disabled={currentRoom === room && !createNewRoom}
                      value={room || ""}
                      onClick={joinAvalibleRoom}
                    >
                      {room}
                    </Navbar.Toggle>
                  </div>
                ))}
                <div>
                  <Navbar.Toggle
                    onClick={newRoom}
                    className="roomsButtons"
                    style={{
                      borderRadius: "0px",
                      color: "white",
                      background: "#0E847B",
                    }}
                    aria-controls="responsive-navbar-nav"
                  >
                    <span>Skapa nytt rum</span>{" "}
                    <AiOutlinePlusCircle style={{ marginLeft: "0.2rem" }} />
                  </Navbar.Toggle>
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
