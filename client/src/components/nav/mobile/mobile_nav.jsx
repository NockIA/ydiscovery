import "./mobile_nav.css";
import '../../../style/index.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth_services";
import { navLinks } from "../../../utils/links";

const MobileNav = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (_authService.getCookie()) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [_authService.getCookie()]);
  return (
    <nav className="container_mobile_nav rowContainer">
      <img className="logo_mobile_nav" src="/logo.png" alt="logo" />
      <span
        onClick={() => setIsOpen(true)}
        className="burger_nav material-symbols-outlined"
      >
        menu
      </span>
      {isOpen && (
        <div className="columnContainer container_hidden_nav alignCenter">
          <span
            onClick={() => setIsOpen(false)}
            className="close_burger material-symbols-outlined"
          >
            close
          </span>
          <ul className="columnContainer container_mobile_links">
            {navLinks.map((link, index) => (
              <Link key={index} className="link_mobile" to={link.url}>
                {link.name}
              </Link>
            ))}
          </ul>
          {isConnected == false && (
            <>
              <Link className="bnt_desktop_nav" to={"/signin"}>
                Login
              </Link>
              <Link className="bnt_desktop_nav" to={"/signup"}>
                Register
              </Link>
            </>
          )}
          <Link className="bnt_desktop_nav"  to={"/profile"}>
            profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
