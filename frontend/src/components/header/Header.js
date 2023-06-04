import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../redux/actions/postAction';
import { getSuggestions } from '../../redux/actions/suggestionsAction';
import logo from "../../images/logo.png"


const Header = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0 })
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
  };

  return (
    <div className="header px-1 px-sm-3 px-md-4 py-3 row m-0 align-items-center">
      <div className="col-2 col-sm-4 col-md-6 col-lg-4">
        <Link to="/" className='header-logo-link d-flex align-items-center' onClick={handleRefreshHome}>
          <img
            src={logo}
            width="40"
            height="40"
            className="bg-light rounded p-1"
            alt="Logo"
          />
          <h5 className='m-0 p-0 ms-2 fw-bold d-none d-sm-inline-block'>NTU Alumni <span className="d-none d-md-inline-block">Channel</span></h5>
        </Link>
      </div>
      <div className="col-10 col-sm-8 col-md-6 col-lg-4">
        <Menu />
      </div>
      <div className="mt-3 mt-lg-0 col-md-12 col-lg-4">
        <Search />
      </div>
    </div>
  );
};

export default Header;
