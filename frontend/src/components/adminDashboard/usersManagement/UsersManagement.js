import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI, postDataAPI } from "../../../utils/fetchData";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const UsersManagement = () => {
  const { auth } = useSelector((state) => state);
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const res = await getDataAPI(`users`, auth.token);
      setUsers(res?.data?.users.filter(u => u.role === "user"));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }, [])

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleEnableDisable = async (id, status) => {
    try {
      // Update the status locally first
      const updatedUsers = users.map(user => {
        if (user._id === id) {
          return { ...user, status: status };
        }
        return user;
      });

      setUsers(updatedUsers)
      await postDataAPI(`/user/updatestatus/${id}`, { status }, auth.token);

      setForceUpdate(prevState => !prevState);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: `User ${status} successfully!` },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const data = []
  return (
    <>
      <div className="admin-panel-heading px-2 py-4">
        <h1>Hello {auth.user.username}</h1>
        <p>Welcome to your Users Management.</p>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered custom-table"> {/* Add custom-table class */}
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your data array and populate the table rows */}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <span className={`status-badge ${user.status === "enabled" ? 'status-enabled' : 'status-disabled'}`}>
                    {user.status === "enabled" ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn ${user.status === "enabled" ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleEnableDisable(user._id, user.status === "enabled" ? 'disabled' : 'enabled')}
                  >
                    {user.status === "enabled" ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersManagement
