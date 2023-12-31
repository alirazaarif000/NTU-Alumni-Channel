import React from 'react'
import Avatar from '../Avatar';
import { useSelector,useDispatch } from "react-redux";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Status = () => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const truncatedUsername = (username) => {
      return username.length > 10 ? username.substring(0, 10) + "..." : username;
    }

    return (
      <div className="status my-3 d-flex">
        <div className="outer-shadow big-avatar-cover">
          <Avatar src={auth.user.avatar} size="big-avatar" className="" />
        </div>
        <button
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
          className="btn-1 statusBtn border border-2 px-4 w-100 fs-6"
          style={{ marginLeft: "7px" }}
        >
          <span style={{ textShadow: "var(--outer-shadow)" }}>
            {truncatedUsername(auth.user.username)}, What's on your mind?
          </span>
        </button>
      </div>
    );
}

export default Status
