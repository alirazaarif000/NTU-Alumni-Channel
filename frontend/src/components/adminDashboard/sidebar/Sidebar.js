import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction";
import "./Sidebar.css";
import React, { useState } from "react";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();

  const isActive = (path) => {
    if (path === "/") {
      return window.location.pathname === "/";
    }
    return window.location.pathname.includes(path);
  };


  return (
    <div className={`sidebar ${showSidebar ? "activeSide" : ""}`}>
      <div className="sidebar_responsive" id="sidebar" onClick={() => setShowSidebar(false)}>
        <div
          className="closebutton text-light fw-bold fs-2 m-0 p-0 cursor-pointer"
          onClick={() => { setShowSidebar(false) }}>
          &times;
        </div>
        <div className="sidebar__title mb-4">
          <Link to="/" >
            <h5 className='m-0'>NTU Alumni Channel</h5>
          </Link>
        </div>

        <div className="sidebar__menu">
          <Link
            to="/"
            className={`sidebar__link ${isActive("/") && "active_menu_link"}`}
          >
            <i className="fa fa-th"></i>
            <span>Dashboard</span>
          </Link>

          <h2 className='mb-2'>ADMIN CONTROL</h2>

          <Link
            to="/users"
            className={`sidebar__link ${isActive("/users") && "active_menu_link"}`}
          >
            <i className="fa fa-users"></i>
            <span>Users Management</span>
          </Link>
          
          <Link
            to="/admins"
            className={`sidebar__link ${isActive("/admins") && "active_menu_link"}`}
          >
            <i className="fa fa-lock" aria-hidden="true"></i>
            <span>Admins Management</span>
          </Link>

          <Link
            to="/adminregister"
            className={`sidebar__link ${isActive("/adminregister") && "active_menu_link"}`}
          >
            <i className="fa fa-user" aria-hidden="true"></i>
            <span>ADD NEW ADMIN</span>
          </Link>

          <Link
            to="/spams"
            className={`sidebar__link ${isActive("/spams") && "active_menu_link"}`}
          >
            <i className="fa fa-ban"></i>
            <span>Spams Management</span>
          </Link>

          <Link
            to="/profile"
            className={`sidebar__link ${isActive("/profile") && "active_menu_link"}`}
          >
            <i className="fa fa-user-circle"></i>
            <span>PROFILE</span>
          </Link>

          <div className="sidebar__logout text-center mx-0 px-0">
            <i className="fa fa-power-off"></i>
            <Link to="/" onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
