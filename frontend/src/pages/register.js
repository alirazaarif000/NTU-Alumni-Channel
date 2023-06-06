import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from '../redux/actions/authAction';
import TopBar from '../components/TopBar';

const Register = () => {
  const { auth, alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
    userType: "teacher",
    cnic: "",
    regno: "",

    // Teacher
    department: "",
    designation: "",
    qualification: "",

    // Alumni
    degree: "",
    // bacth: "",
    passingYear: "",

    // Student
    // university: "",
    major: "",
    semester: ""

  };

  const [formData, setFormData] = useState(initialState);
  const {
    fullname,
    username,
    email,
    password,
    cf_password,
    userType,
    cnic,
    regno,

    // Teacher
    department,
    designation,
    qualification,

    // Alumni
    degree,
    passingYear,

    // Student
    // university,
    major,
    semester,
  } = formData;

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    if(name === "cnic") {
      value = value.replace(/[^0-9]/g, "").slice(0, 13)
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const renderFieldsByRole = () => {
    switch (userType) {
      case "teacher":
        return (
          <div className="row m-0">
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="department" className="form-label fw-bold">Department:</label>
              <select
                className="form-select text-center"
                id="department"
                name="department"
                value={department}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="department-1">Department 1</option>
                <option value="department-2">Department 2</option>
                <option value="department-3">Department 3</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="designation" className="form-label fw-bold">Designation:</label>
              <select
                className="form-select text-center"
                id="designation"
                name="designation"
                value={designation}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="designation-1">Designation 1</option>
                <option value="designation-2">Designation 2</option>
                <option value="designation-3">Designation 3</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="qualification" className="form-label fw-bold">Qualification:</label>
              <select
                className="form-select text-center"
                id="qualification"
                name="qualification"
                value={qualification}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="qualification-1">Qualification 1</option>
                <option value="qualification-2">Qualification 2</option>
                <option value="qualification-3">Qualification 3</option>
              </select>
            </div>
          </div>
        );
      case "alumni":
        return (
          <div className="row m-0">
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="regno" className="form-label">
                Registeration No.
              </label>
              <input
                type="text"
                placeholder="00-NTU-XX-XX-0000"
                className="form-control"
                id="regno"
                onChange={handleChangeInput}
                value={regno}
                name="regno"
                required
              />
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="passingYear" className="form-label fw-bold">Passing Year:</label>
              <select
                className="form-select text-center"
                id="passingYear"
                name="passingYear"
                value={passingYear}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="degree" className="form-label fw-bold">Degree:</label>
              <select
                className="form-select text-center"
                id="degree"
                name="degree"
                value={degree}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>
          </div>
        );
      case "student":
        return (
          <div className="row m-0">
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="regno" className="form-label">
                Registeration No.
              </label>
              <input
                type="text"
                placeholder="00-NTU-XX-XX-0000"
                className="form-control"
                id="regno"
                onChange={handleChangeInput}
                value={regno}
                name="regno"
                required
              />
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="semester" className="form-label fw-bold">Semester:</label>
              <select
                className="form-select text-center"
                id="semester"
                name="semester"
                value={semester}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="major" className="form-label fw-bold">Major:</label>
              <select
                className="form-select text-center"
                id="major"
                name="major"
                value={major}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="computer-science">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="mathematics">Mathematics</option>
              </select>
            </div>

          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <TopBar />
      <div className="auth_page pt-2 pt-md-3">
        <form onSubmit={handleSubmit} className="px-3 px-md-5 py-4 py-md-5">
          <h2 className="text-uppercase text-center mb-4">
            Signup Panel
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
                required
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
                required
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
                required
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
                  required
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
                  required
                  style={{
                    background: `${alert.cf_password ? "#fd2d6a14" : ""} `,
                  }}
                />
              </div>
              <small className="form-text text-danger">
                {alert.cf_password ? alert.cf_password : ""}
              </small>
            </div>


            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="cnic" className="form-label">
                CNIC
              </label>
              <input
                type="text"
                placeholder="9999999999999"
                className="form-control"
                id="cnic"
                onChange={handleChangeInput}
                value={cnic}
                name="cnic"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Select Role:</label>
              <div className='text-center'>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    id="teacherRole"
                    name="userType"
                    value="teacher"
                    defaultChecked
                    onChange={handleChangeInput}
                  />
                  <label className="form-check-label cursor-pointer" htmlFor="teacherRole">Teacher</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    id="alumniRole"
                    name="userType"
                    value="alumni"
                    onChange={handleChangeInput}
                  />
                  <label className="form-check-label cursor-pointer" htmlFor="alumniRole">Alumni</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    id="studentRole"
                    name="userType"
                    value="student"
                    onChange={handleChangeInput}
                  />
                  <label className="form-check-label cursor-pointer" htmlFor="studentRole">Student</label>
                </div>
              </div>
            </div>

            {renderFieldsByRole()}

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

          <div className="text-center">
            Already have an account?{" "}
            <Link to="/" style={{ color: "crimson" }}>
              Login Now!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
