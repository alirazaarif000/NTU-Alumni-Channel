import React from "react";
import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import { isReadNotify } from "../../redux/actions/notifyAction";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/", tooltip: "Followers Post" },
    {
      label: "Discover",
      icon: "explore",
      path: "/discover",
      tooltip: "Other Posts",
    },
    { label: "Jobs", icon: "work", path: "/job", tooltip: "Find Jobs" },
  ];

  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleReadTextMessags = () => {
    dispatch(isReadNotify({ auth, textMessage: true, notify }));
  };

  const isActive = (pn) => {
    if (pn === "/") {
      if (pathname === pn) return "active";
    } else if (pathname.includes(pn)) return "active";
  };

  return (
    <ul className="d-flex header-navbar text-light border border-2">
      {navLinks.map((link, index) => (
        <li
          className={`header-navbar-li px-1 px-sm-2 ${isActive(link.path)}`}
          key={index}
          data-tooltip-id="id"
          data-tooltip-content={link.tooltip}
        >
          <Link to={link.path}>
            <span className="material-icons d-flex">{link.icon}</span>
          </Link>
        </li>
      ))}

      {(() => {
        const textMessages = notify.data.filter(
          (msg) => msg.type === "textMessage"
        );

        const unreadTextMessages = textMessages.filter((msg) => !msg.isRead);

        if (unreadTextMessages.length > 0) {
          return (
            <li
              className={`header-navbar-li px-1 px-sm-2 ${isActive(
                "/message"
              )}`}
              onClick={() => handleReadTextMessags()}
              data-tooltip-id="tooltip-message"
              data-tooltip-content="Messages"
            >
              <Link to={`${unreadTextMessages[0].url}`}>
                <span className="material-icons d-flex dot">near_me</span>
              </Link>
            </li>
          );
        }

        return (
          <li
            className={`header-navbar-li px-1 px-sm-2 ${isActive("/message")}`}
            data-tooltip-id="tooltip-message"
            data-tooltip-content="Messages"
          >
            <Link to="/message">
              <span className="material-icons d-flex">near_me</span>
            </Link>
          </li>
        );
      })()}

      <li
        className="dropdown"
        data-tooltip-id="notification-tooltip"
        data-tooltip-content="Notifications"
      >
        <span
          className="nav-link position-relative"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            style={{
              color: notify.data.some((msg) => msg.type !== "textMessage")
                ? "var(--c1)"
                : "",
            }}
            className={`material-icons d-flex`}
          >
            notifications
          </span>
          {notify.data.some(
            (msg) => msg.type !== "textMessage" && !msg.isRead
          ) && (
            <span className="notify_length">
              {
                notify.data.filter(
                  (msg) => msg.type !== "textMessage" && !msg.isRead
                ).length
              }
            </span>
          )}
        </span>
        <div
          className="dropdown-menu notification-box mx-2"
          aria-labelledby="navbarDropdown"
        >
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
        <ul
          className="dropdown-menu text-start"
          aria-labelledby="navbarDropdown"
        >
          <li className="mb-1">
            <Link
              className={`dropdown-item rounded ${isActive(
                `/profile/${auth.user._id}`
              )}`}
              to={`/profile/${auth.user._id}`}
            >
              Profile
            </Link>
          </li>
          <li className="mt-1">
            <Link
              className="dropdown-item rounded"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </li>
        </ul>
        <ReactTooltip id="tooltip-message" effect="solid" place="bottom" />
        <ReactTooltip id="notification-tooltip" effect="solid" place="bottom" />
      </li>
      <ReactTooltip id="id" effect="solid" place="bottom" />
    </ul>
  );
};

export default Menu;
