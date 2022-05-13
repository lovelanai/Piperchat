import "./Header.css";

import piedpiper from "../assets/img/piedpiper.png";
import logo from "../assets/img/logo.png";

function Header() {
  return (
    <div className="header">
      <div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Header;
