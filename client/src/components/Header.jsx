import "./Header.css";

import piedpiper from "../assets/img/piedpiper.png";

function Header() {
  return (
    <div className="header">
      <div>
        <img src={piedpiper} alt="logo" />
      </div>
    </div>
  );
}

export default Header;
