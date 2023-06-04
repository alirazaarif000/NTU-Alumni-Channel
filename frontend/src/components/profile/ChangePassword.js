import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { changePassword } from "../../redux/actions/authAction";

import { checkImage } from "../../utils/imageUpload";

const ChangePassword = ({ setChangePassword }) => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    cnfNewPassword: ""
  };
  const [formData, setFormData] = useState(initialState);
  const {
    oldPassword,
    newPassword,
    cnfNewPassword,
  } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword, cnfNewPassword, auth }));
  };

  return (
    <div className="edit_password">
      <form onSubmit={handleSubmit} className="px-3 px-md-5 pt-5 pb-4">
        <button
          className="btn btn-danger btn_close"
          onClick={() => setChangePassword(false)}
        >
          Close
        </button>

        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Old Password
          </label>
            <input
              type={"password"}
              placeholder="Old Password"
              className="form-control"
              id="oldPassword"
              onChange={handleChangeInput}
              value={oldPassword}
              name="oldPassword"
            />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
            <input
              type={"password"}
              placeholder="New Password"
              className="form-control"
              id="newPassword"
              onChange={handleChangeInput}
              value={newPassword}
              name="newPassword"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="cnfNewPassword" className="form-label">
            Confirm Password
          </label>
            <input
              type={"password"}
              placeholder="Confirm New Password"
              className="form-control"
              id="cnfNewPassword"
              onChange={handleChangeInput}
              value={cnfNewPassword}
              name="cnfNewPassword"
            />
        </div>


        <div className="text-center">
          <button
            type="submit"
            className="form-button"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
