import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Following from './Following';
import Followers from './Followers';
import ChangePassword from './ChangePassword';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter(user => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  const truncatedUsername = (username) => {
    return username.length > 10 ? username.substring(0, 10) + "..." : username;
  }

  return (
    <div className="info">

      {userData.map((user) => (

        <div key={user._id} className="row m-0">

          <div className="d-flex justify-content-center align-items-center col-sm-3 mb-4 mb-sm-0">
            <Avatar src={user.avatar} size="supper-avatar" style={{ borderRadius: "50%", height: "170px", width: "170px" }} />
          </div>

          <div className="col-sm-9">
            <div className="row">
              <div className='col-4 d-flex align-items-center'>
                <h2 className='me-2'>{truncatedUsername(user.username)}</h2>
                <span className='text-muted'>~{user.userType}</span>
              </div>

              <div className='text-end col-8 mb-2 col-md-4'>
                {user._id === auth.user._id ? (
                  <button
                    className="app-button me-md-2"
                    onClick={() => setOnEdit(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <FollowBtn user={user} />
                )}

              </div>

              <div className='text-center text-md-start col-12 col-md-4 p-md-0'>
                {user._id === auth.user._id ? (
                  <button
                    className="app-button w-100"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className='text-center text-sm-start'>
              <div className="follow_btn mt-2 mt-sm-1 mb-1">
                <span onClick={() => setShowFollowers(true)} className='me-4 cursor-pointer'>
                  {user.followers.length} Followers
                </span>
                <span onClick={() => setShowFollowing(true)} className='cursor-pointer'>
                  {user.following.length} Following
                </span>
              </div>

              <h4>
                {user.fullname}
                <span className="ms-1 color-violet fs-6">{user.mobile}</span>
              </h4>
              <h6>{user.email}</h6>
              <p className="m-0">{user.address}</p>
              <a
                style={{ textDecoration: "none" }}
                href={`http://${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
              <p>{user.story}</p>
            </div>

          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}

    </div>
  );
}

export default Info
