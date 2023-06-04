import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../images/logo.png"
const TopBar = () => {
    return (
        <div className="topbar px-2 px-sm-3 px-md-4">
            <Link to="/" className='logo-link d-flex align-items-center'>
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="bg-light rounded p-1 me-2"
                    alt="Logo"
                />
                <span className='fs-3 fw-bold'>NTU Alumni Channel</span>
            </Link>
        </div>
    )
}

export default TopBar