import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <ul className="d-flex header-navbar text-light border border-2">
      {navLinks.map((link, index) => (
        <li className={`header-navbar-li px-1 px-sm-2 ${isActive(link.path)}`} key={index}>
          <Link to={link.path}>
            <span className="material-icons d-flex">{link.icon}</span>
          </Link>
        </li>
      ))}

      <li className="dropdown">
        <span
          className="nav-link position-relative"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            style={{ color: notify.data.length > 0 ? "var(--c1)" : "" }}
            className={`material-icons d-flex`}
          >
            notifications
          </span>
          <span className="notify_length">{notify.data.length}</span>
        </span>

        <div className="dropdown-menu notification-box mx-2" aria-labelledby="navbarDropdown">
          <NotifyModal />
        </div>
      </li>

      <li className="dropdown">
        <span
          className="dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Avatar src={auth.user.avatar} size="medium-avatar" />
        </span>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li className="pb-2 border-bottom">
            <Link
              className={`dropdown-item rounded ${isActive(`/profile/${auth.user._id}`)}`}
              to={`/profile/${auth.user._id}`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item rounded"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
