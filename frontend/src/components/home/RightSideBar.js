import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";

import { getSuggestions } from "../../redux/actions/suggestionsAction";


const RightSideBar = () => {

  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();


  return (
    <div className="my-4">
      <div className="inner-shadow" style={{ borderRadius: "5px" }}>
        <UserCard user={auth.user} />
      </div>
      <div className='border rounded px-lg-2'>
        <div className="d-flex justify-content-between align-items-center mt-2 border-bottom px-2">
          <h5
            className="color-c1 m-0"
            style={{ textShadow: "var(--outer-shadow)" }}
          >
            Suggestions
          </h5>

          <button className="btn-1 d-flex justify-content-center align-items-center" disabled={suggestions.loading}>
            <i
              className="fas fa-redo "
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(getSuggestions(auth.token))}
            />
          </button>
        </div>

        {suggestions.loading ? (
          <div className="text-center p-2"><img width={30} src={LoadIcon} alt="Loading" /></div>
        ) : (
          <div>
            {suggestions.users.length >= 1 ? suggestions.users.map((user) => (
              <div
                key={user._id}
              >
                <UserCard key={user._id} user={user}>
                  <FollowBtn key={user._id} user={user} />
                </UserCard>
              </div>
            )): <div className="p-2 text-center text-muted">No Suggestions!</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideBar
