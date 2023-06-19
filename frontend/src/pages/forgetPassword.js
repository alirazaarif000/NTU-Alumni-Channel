import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { forgetpassword } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";

const ForgetPassword = () => {
  const initialState = { email: "" };
  const [formData, setFormData] = useState(initialState);
  const { email } = formData;

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
    dispatch(forgetpassword(formData)).then(setFormData(initialState));
  };

  return (
    <>
      <TopBar />
      <div className="login-panel-container auth_page pt-2 pt-md-3">
        <form
          onSubmit={handleSubmit}
          className="px-3 px-sm-4 px-md-5 py-4 py-md-5 w-100 forgetForm"
        >
          <h3 className="text-uppercase text-center mb-4">Reset Password</h3>
          <div className="mb-4">
            <label htmlFor="loginemail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="form-control "
              id="loginemail"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              name="email"
              required
            />
          </div>

          <div className="mb-4 text-center">
            <button type="submit" className="form-button">
              Send Code
            </button>
          </div>

          <div className="text-center">
            Back to the{"  "}
            <Link to="/" style={{ color: "crimson" }}>
              Login Page!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
