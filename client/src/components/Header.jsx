import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div>
          <h1>Stranger Danger</h1>
        </div>
      </Link>
    </div>
  );
}

export default Header;
