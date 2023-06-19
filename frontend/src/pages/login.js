import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import bg1 from "../images/bg.jpg";
const bgImg = [bg1];
const Login = () => {
  const initialState = { email: "", password: "", role: "user" };
  const [formData, setFormData] = useState(initialState);
  const { email, password, role } = formData;

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "user") {
      dispatch(login(formData));
    } else if (role === "admin") {
      dispatch(adminLogin(formData));
    }
  };

  return (
    <>
      <TopBar />
      <div className="login-panel-container auth_page pt-2 pt-md-3">
        <form
          onSubmit={handleSubmit}
          className="px-3 px-sm-4 px-md-5 py-4 py-md-5"
        >
          <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <label htmlFor="loginemail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="aliraza@gmail.com"
              className="form-control "
              id="loginemail"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              name="email"
            />
            <p
              id="emailHelp"
              className="text-light mt-1 text-center"
              style={{ fontSize: "12px" }}
            >
              We'll never share your email with anyone else.
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="loginpassword" className="form-label d-flex w-100">
              <div>Password</div>
            </label>
            <input
              placeholder="Password"
              type={"password"}
              className="form-control"
              id="loginpassword"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <div className="ms-auto mt-2">
              <Link
                to="/resetpassword"
                style={{ fontSize: "14px", textDecoration: "none" ,color: "crimson" }}
              >
                Forget Password?
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Select Role:</label>
            <div className="text-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input cursor-pointer"
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={handleChangeInput}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="user"
                >
                  User
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input cursor-pointer"
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={handleChangeInput}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="admin"
                >
                  Admin
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="form-button"
              disabled={email && password ? false : true}
            >
              Login
            </button>
          </div>

          <div className="text-center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "crimson" }}>
              Register Now!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
