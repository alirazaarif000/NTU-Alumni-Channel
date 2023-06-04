import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from 'moment';
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction';

const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if (window.confirm(`You have ${newArr.length} unread notifications.Do you want to delete all notifications?`)) {
      return dispatch(deleteAllNotifies(auth.token))
    }
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className='m-0 me-5'>Notifications</h3>
        {notify.sound ? (
          <i
            className="fas fa-bell text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        )}
      </div>

      <hr className="my-2" />

      {notify.data.length === 0 && (
        <div className="text-muted text-center py-3">No Notifications</div>
      )}

      <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div className="px-2 mb-3" key={index}>
            <Link
              to={`${msg.url}`}
              style={{ textDecoration: "none" }}
              className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />

              <div className="flex-fill mx-1">
                <div>
                  <strong className="me-1">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              <div style={{ width: "30px" }}>
                {msg.image && <Avatar src={msg.image} size="medium-avatar" />}
              </div>
            </Link>
            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle color-c1" />}
            </small>
          </div>
        ))}
      </div>

      <hr className="my-2" />

      <div
        className="text-light text-center rounded p-1"
        style={{ cursor: "pointer", fontWeight: "bold", background: "var(--linear-gradient)" }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  );
}

export default NotifyModal
