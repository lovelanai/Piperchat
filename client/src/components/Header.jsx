import "./Header.css";
import { Link } from "react-router-dom";
import piedpiper from "../assets/img/piedpiper.png";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div>
          <img src={piedpiper} alt="logo" />
        </div>
      </Link>
    </div>
  );
}

export default Header;
