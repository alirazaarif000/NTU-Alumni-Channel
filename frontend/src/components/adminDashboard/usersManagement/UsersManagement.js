import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../../../utils/fetchData';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import UsersModal from '../../modal/UsersModal';
import LoadIcon from '../../../images/loading.gif'

const UsersManagement = ({ ROLE }) => {
  const { auth } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const [resetPasswordData, setResetPasswordData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [resetPasswordModal, setResetPasswordModal] = useState(false);

  const handleResetPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDataAPI('user/resetpassword', { ...resetPasswordData }, auth.token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: `"${resetPasswordData.email}" reset successfully!` },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
    setResetPasswordModal(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await getDataAPI(`users?username=${searchQuery}`, auth.token);
        const filteredUsers = res?.data?.users.filter(u => u.userType === ROLE);
        setUsers(filteredUsers);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    };

    fetchUsers();
  }, [auth.token, dispatch, searchQuery, ROLE]);

  return (
    <>
      <div className="admin-panel-heading px-2 py-4">
        <h1>Hello {auth.user.username}</h1>
        <p>Welcome to your {ROLE}s Management.</p>
      </div>
      <div className="row m-0 mt-3">
        <div className="col-6 m-0 p-0">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#resetPasswordModal"
          >
            Reset Password
          </button>
        </div>
        <div className="col-6 p-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive mt-3">
        {!loading ? users.length >= 1 ?
          <table className="table table-bordered custom-table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">FullName</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.fullname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`status-badge ${user.status === 'verified' ? 'status-enabled' : 'status-disabled'}`}
                    >
                      {user.status === 'verified' ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info text-light w-100"
                      data-bs-toggle="modal"
                      data-bs-target={`#userModal${user._id}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> :
          <div className='text-center mt-4 border border-dark border-2 rounded p-3 mx-auto' style={{ maxWidth: "768px" }}>
            <h2 className='m-0'>No Record Found!</h2>
          </div> :
          <div className="text-center p-2 mt-4"><img width={30} src={LoadIcon} alt="Loading" /></div>
        }
      </div>
      {users.map(user => (
        <UsersModal
          key={user._id}
          user={{
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            gender: user.gender,
            role: user.userType,
            ...(ROLE === "teacher" && {
              cnic: user.cnic,
              department: user.department,
              designation: user.designation,
              qualification: user.qualification
            }),
            ...(ROLE === "alumni" && {
              cnic: user.cnic,
              regno: user.regno,
              degree: user.degree,
              passingYear: user.passingYear,
            }),
            ...(ROLE === "student" && {
              cnic: user.cnic,
              regno: user.regno,
              major: user.major,
              semester: user.semester,
            }),
            status: user.status,
          }}
          users={users}
          setUsers={setUsers}
        />
      ))}

      <div
        className="modal fade"
        id="resetPasswordModal"
        tabIndex="-1"
        aria-labelledby="resetPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resetPasswordModalLabel">
                Reset Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={resetPasswordData.email}
                    onChange={handleResetPasswordInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={resetPasswordData.newPassword}
                    onChange={handleResetPasswordInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={resetPasswordData.confirmPassword}
                    onChange={handleResetPasswordInputChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
