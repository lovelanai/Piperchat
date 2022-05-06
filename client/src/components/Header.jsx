import "./Header.css";
import { Link } from "react-router-dom";
import piedpiper from "../assets/img/piedpiper.png";

function Header() {
  return (
    <div className="header">
      <div style={{ position: "relative" }}>
        <Link to="/">pied piper</Link>
      </div>
    </div>
  );
}

export default Header;
