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
    username: "",
    email: "",
    regno: "",
    cnic: "",

    // Teacher
    department: "",
    designation: "",
    qualification: "",

    // Alumni
    degree: "",
    passingYear: "",

    // Student
    major: "",
    semester: "",
  };

  const [formData, setFormData] = useState(initialState);
  const {
    fullname,
    mobile,
    address,
    website,
    story,
    gender,
    username,
    email,
    regno,
    cnic,

    // Teacher
    department,
    designation,
    qualification,

    // Alumni
    degree,
    passingYear,

    // Student
    major,
    semester,
  } = formData;

  const [avatar, SetAvatar] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(auth.user);
  }, [auth.user]);

  const renderFieldsByRole = (type) => {
    switch (type) {
      case "teacher":
        return (
          <div className="row m-0">
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="department" className="form-label fw-bold">
                Department:
              </label>
              <select
                className="form-select text-center"
                id="department"
                name="department"
                value={department}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="Department of Computer Science">
                  Department of Computer Science
                </option>
                <option value="Department of Applied Sciences">
                  Department of Applied Sciences
                </option>
                <option value="Department of Textile Engineering">
                  Department of Textile Engineering
                </option>
                <option value="Department of Textile Technology">
                  Department of Textile Technology
                </option>
                <option value="Department of Materials">
                  Department of Materials
                </option>
                <option value="Faisalabad Business School">
                  Faisalabad Business School
                </option>
                <option value="School of Arts & Design">
                  School of Arts & Design
                </option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="designation" className="form-label fw-bold">
                Designation:
              </label>
              <select
                className="form-select text-center"
                id="designation"
                name="designation"
                value={designation}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="qualification" className="form-label fw-bold">
                Qualification:
              </label>
              <select
                className="form-select text-center"
                id="qualification"
                name="qualification"
                value={qualification}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="phd">PHD</option>
                <option value="ms">MS</option>
                <option value="bs">BS</option>
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
              <label htmlFor="passingYear" className="form-label fw-bold">
                Passing Year:
              </label>
              <select
                className="form-select text-center"
                id="passingYear"
                name="passingYear"
                value={passingYear}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="degree" className="form-label fw-bold">
                Degree:
              </label>
              <select
                className="form-select text-center"
                id="degree"
                name="degree"
                value={degree}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
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
              <label htmlFor="semester" className="form-label fw-bold">
                Semester:
              </label>
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
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            <div className="mb-3 col-md-6 col-lg-4">
              <label htmlFor="major" className="form-label fw-bold">
                Major:
              </label>
              <select
                className="form-select text-center"
                id="major"
                name="major"
                value={major}
                onChange={handleChangeInput}
                required
              >
                <option value="">Not Selected</option>
                <option value="BS Computer Science">BS Computer Science</option>
                <option value="BS Software Engineering">
                  BS Software Engineering
                </option>
                <option value="BS Artificial Intelligence">
                  BS Artificial Intelligence
                </option>
                <option value="BS Artificial Intelligence">
                  BS Information Technology
                </option>
                <option value="BS Textile Engineering">
                  BS Textile Engineering
                </option>
                <option value="BS Polymer Engineering">
                  BS Polymer Engineering
                </option>
                <option value="BS Apparel Manufacturing">
                  BS Apparel Manufacturing
                </option>
                <option value="BS Textile Engineering Technology">
                  BS Textile Engineering Technology
                </option>
                <option value="BS Fashion Design & Technology">
                  BS Fashion Design & Technology
                </option>
                <option value="BS in Textile Design">
                  BS in Textile Design
                </option>
                <option value="BS in Visual Arts">BS in Visual Arts</option>
                <option value="BS in Animation & Multimedia Design">
                  BS in Animation & Multimedia Design
                </option>
                <option value="BS in Business Administration">
                  BS in Business Administration
                </option>
                <option value="BS in Textile Management & Marketing">
                  BS in Textile Management & Marketing
                </option>
                <option value="BS in Textile & Apparel Merchandising">
                  BS in Textile & Apparel Merchandising
                </option>
                <option value="BS Accounting & Finance">
                  BS Accounting & Finance
                </option>
                <option value="BS Applied Mathematics<">
                  BS Applied Mathematics
                </option>
                <option value="BS Applied Physics">BS Applied Physics</option>
                <option value="BS Applied Statistics">
                  BS Applied Statistics
                </option>
                <option value="BS Applied Chemistry">
                  BS Applied Chemistry
                </option>
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
    let { name, value } = e.target;
    if (name === "cnic") {
      value = value.replace(/[^0-9]/g, "").slice(0, 13);
    }
    // if (name === "mobile") {
    //   value = value.replace(/\s/g, "");
    // }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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

        <div className="row mb-4">
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="fullname" className="form-label">
              Full name
            </label>
            <input
              type="text"
              placeholder="Ali Raza"
              className="form-control"
              id="fullname"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <input
              type="text"
              placeholder="aliraza1"
              className="form-control"
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              required
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="aliraza@gmail.com"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              name="email"
              required
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              placeholder="+923080000000"
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
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="male"
                >
                  Male
                </label>
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
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="female"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="website" className="form-label">
              Facebook Profile
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
          {renderFieldsByRole(auth.user.userType)}
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
          <button type="submit" className="form-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
