import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

import { checkImage } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
    userType: "",

    // Teacher
    department: "",
    designation: "",
    qualification: "",

    // Alumni
    degree: "",
    batch: "",
    passingYear: "",

    // Student
    university: "",
    major: "",
    semester: ""

  };

  const [formData, setFormData] = useState(initialState);
  const {
    fullname,
    mobile,
    address,
    website,
    story,
    gender,
    userType,

    // Teacher
    department,
    designation,
    qualification,

    // Alumni
    degree,
    batch,
    passingYear,

    // Student
    university,
    major,
    semester,
  } = formData;

  const [avatar, SetAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(auth.user);
  }, [auth.user]);

  const renderFieldsByRole = () => {
    switch (userType) {
      case "teacher":
        return (
          <div className="row m-0 m-0">
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
              <label htmlFor="batch" className="form-label fw-bold">Batch:</label>
              <select
                className="form-select text-center"
                id="batch"
                name="batch"
                value={batch}
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
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="university" className="form-label fw-bold">University:</label>
              <select
                className="form-select text-center"
                id="university"
                name="university"
                value={university}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="university-1">University 1</option>
                <option value="university-2">University 2</option>
                <option value="university-3">University 3</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    SetAvatar(file);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProfileUser({ formData, avatar, auth }));
  };

  return (
    <div className="edit_profile">

      <form onSubmit={handleSubmit} className="px-3 px-md-5 pt-5 pb-4">
        <button
          className="btn btn-danger btn_close"
          onClick={() => setOnEdit(false)}
        >
          Close
        </button>

        <div className="info_avatar">
          <img
            alt="profile"
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

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
            />
          </div>


          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              placeholder="+92312-3456-789"
              className="form-control"
              id="mobile"
              onChange={handleChangeInput}
              value={mobile}
              name="mobile"
            />
          </div>

          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              id="address"
              onChange={handleChangeInput}
              value={address}
              name="address"
            />
          </div>

          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="website" className="form-label">
              Website
            </label>
            <input
              type="text"
              placeholder="www.example.com"
              className="form-control"
              id="website"
              onChange={handleChangeInput}
              value={website}
              name="website"
            />
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
                  checked= {gender === "male"}
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
                  checked= {gender === "female"}
                  onChange={handleChangeInput}
                />
                <label className="form-check-label cursor-pointer" htmlFor="female">Female</label>
              </div>
            </div>
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
                  checked= {userType === "teacher"}
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
                  checked= {userType === "alumni"}
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
                  checked= {userType === "student"}
                  onChange={handleChangeInput}
                />
                <label className="form-check-label cursor-pointer" htmlFor="studentRole">Student</label>
              </div>
            </div>
          </div>

          {renderFieldsByRole()}

          <div className="mb-3">
            <label htmlFor="story" className="form-label">
              Story
            </label>
            <textarea
              cols="30"
              rows="4"
              type="text"
              className="form-control"
              id="story"
              name="story"
              value={story}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="form-button"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
