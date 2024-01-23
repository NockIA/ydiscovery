import { Link, useLocation } from "react-router-dom";
import '../../../style/index.css'
import "./desktop_nav.css";
import AuthService from "../../../services/auth_services";
import { useEffect, useState } from "react";
import { navLinks } from "../../../utils/links";

const DesktopNav = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (_authService.getCookie()) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [_authService.getCookie()]);

  return (
    <nav className="container_desktop_nav rowContainer">
      <img className="desktop_logo_nav" src="/logo.png" alt="" />
      <div className="rowContainer container_desktop_nav_links">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            className={`link ${
              location.pathname === link.url ? "active_link" : ""
            }`}
            to={link.url}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="rowContainer container_btns_nav_desktop">
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
        <Link className="bnt_desktop_nav" to={"/profile"}>
            profile
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;
