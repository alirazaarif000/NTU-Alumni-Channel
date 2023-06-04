import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../../../redux/actions/authAction";

const RegisterAdmin = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male"
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAdmin(userData));
  };

  return (
    <>
      <div className="admin-panel-heading px-2 py-4">
        <h1>Hello {auth.user.username}</h1>
        <p>Welcome to your Admin Signup Panel.</p>
      </div>
      <div className="auth_page pt-2 pt-md-3">
        <form onSubmit={handleSubmit} className="px-3 px-md-5 py-4 py-md-5">
          <h2 className="text-uppercase text-center mb-4">
            Admin Panel
          </h2>
          <div className='row mb-4'>

            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="fullname" className="form-label">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                className="form-control"
                id="fullname"
                onChange={handleChangeInput}
                value={fullname}
                name="fullname"
                style={{ background: `${alert.fullname ? "#fd2d6a14" : ""} ` }}
              />
              <small className="form-text text-danger">
                {alert.fullname ? alert.fullname : ""}
              </small>
            </div>

            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="username" className="form-label">
                User name
              </label>
              <input
                type="text"
                placeholder="johnsmith07"
                className="form-control"
                id="username"
                onChange={handleChangeInput}
                value={username.toLowerCase().replace(/ /g, "")}
                name="username"
                style={{ background: `${alert.username ? "#fd2d6a14" : ""} ` }}
              />
              <small className="form-text text-danger">
                {alert.username ? alert.username : ""}
              </small>
            </div>

            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                placeholder="john@gmail.com"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChangeInput}
                value={email}
                name="email"
                style={{ background: `${alert.email ? "#fd2d6a14" : ""} ` }}
              />
              <small className="form-text text-danger">
                {alert.email ? alert.email : ""}
              </small>
            </div>

            <div className="col-sm-12 col-md-6 mb-3">
              <label className="form-label fw-bold">Gender</label>
              <div className="text-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    defaultChecked
                    onChange={handleChangeInput}
                  />
                  <label className="form-check-label cursor-pointer" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={handleChangeInput}
                  />
                  <label className="form-check-label cursor-pointer" htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="pass">
                <input
                  type={"password"}
                  placeholder="Password"
                  className="form-control"
                  id="password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                  style={{
                    background: `${alert.password ? "#fd2d6a14" : ""} `,
                  }}
                />
              </div>
              <small className="form-text text-danger">
                {alert.password ? alert.password : ""}
              </small>
            </div>

            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="cf_password" className="form-label">
                Confirm Password
              </label>
              <div className="pass">
                <input
                  type={"password"}
                  placeholder="Confirm Password"
                  className="form-control"
                  id="cf_password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  name="cf_password"
                  style={{
                    background: `${alert.cf_password ? "#fd2d6a14" : ""} `,
                  }}
                />
              </div>
              <small className="form-text text-danger">
                {alert.cf_password ? alert.cf_password : ""}
              </small>
            </div>
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="form-button"
              disabled={email && password ? false : true}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>


  );
};

export default RegisterAdmin;
