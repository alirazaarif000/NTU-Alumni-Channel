import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const UsersModal = ({ user, users, setUsers }) => {
  const { auth } = useSelector((state) => state);
  const [status, setStatus] = useState(user.status);
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  const handleStatus = async (userStatus) => {
    try {
      const updatedUsers = users.map(u => {
        if (u._id === user._id) {
          return { ...u, status: userStatus };
        }
        return u;
      });

      setStatus(userStatus);
      setUsers(updatedUsers);

      await postDataAPI(`/user/updatestatus/${user._id}`, { status: userStatus }, auth.token);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: `User ${user.fullname} ${capitalizeFirstLetter(userStatus)} successfully!` },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  return (
    <div className="modal fade" id={`userModal${user._id}`} tabIndex="-1" aria-labelledby={`userModalLabel${user._id}`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`userModalLabel${user._id}`}>{capitalizeFirstLetter(user.userType ? user.userType : user.role)} Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {Object.entries(user).map(([key, value]) => (
              key !== '_id' && (
                <div className="form-group row" key={key}>
                  <label className="col-sm-3 col-form-label fw-bold">{capitalizeFirstLetter(key)}</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control-plaintext" value={value} readOnly />
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className={`btn ${user.status === "verified" ? 'btn-danger' : 'btn-success'}`} onClick={() => handleStatus(status === "verified" ? 'unverified' : 'verified')}>{status === "verified" ? 'Unverified' : 'Verified'}</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
