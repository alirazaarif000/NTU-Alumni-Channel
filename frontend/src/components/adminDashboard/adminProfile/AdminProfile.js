import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, updateProfileAdmin } from "../../../redux/actions/authAction";

const AdminProfile = () => {
    const { auth, alert } = useSelector((state) => state);
    const dispatch = useDispatch();

    const initialState = {
        fullname: auth.user.username,
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        cf_password: "",
        gender: ""
    };
    const [userData, setUserData] = useState(initialState);
    const { fullname, username, email, oldPassword, newPassword, cf_password, gender } = userData;

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfileAdmin({formData: userData, auth}));
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword(
            {
                oldPassword: userData.oldPassword,
                newPassword: userData.newPassword,
                cnfNewPassword: userData.cf_password,
                auth
            }
        ))
    }

    return (
        <>
            <div className="admin-panel-heading px-2 py-4">
                <h1>Hello {auth.user.username}</h1>
                <p>Welcome to your Profile.</p>
            </div>
            <div className="auth_page pt-2 pt-md-3">
                <form onSubmit={handleSubmit} className="bg-primary px-3 px-md-5 py-4 py-md-4">
                    <h2 className="text-uppercase text-center mb-4">
                        Admin Profile
                    </h2>
                    <div className='row mb-3'>

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

                        <div className="col-sm-12 col-md-6 mb-4">
                            <label className="form-label fw-bold">Gender</label>
                            <div className="text-center">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input cursor-pointer"
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"}
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
                                        checked={gender === "female"}
                                        onChange={handleChangeInput}
                                    />
                                    <label className="form-check-label cursor-pointer" htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 text-center">
                            <button
                                type="submit"
                                className="form-button"
                            >
                                Update
                            </button>
                        </div>

                        <div className="col-sm-12 mb-3">
                            <label htmlFor="oldPassword" className="form-label">
                                Old Password
                            </label>
                            <input
                                type={"password"}
                                placeholder="Password"
                                className="form-control"
                                id="oldPassword"
                                onChange={handleChangeInput}
                                value={oldPassword}
                                name="oldPassword"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                New Password
                            </label>
                            <input
                                type={"password"}
                                placeholder="Password"
                                className="form-control"
                                id="newPassword"
                                onChange={handleChangeInput}
                                value={newPassword}
                                name="newPassword"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3">
                            <label htmlFor="cf_password" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type={"password"}
                                placeholder="Confirm Password"
                                className="form-control"
                                id="cf_password"
                                onChange={handleChangeInput}
                                value={cf_password}
                                name="cf_password"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            className="form-button"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </>


    );
};

export default AdminProfile;
