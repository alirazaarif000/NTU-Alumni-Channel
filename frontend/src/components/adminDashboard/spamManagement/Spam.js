import React, { useEffect } from "react";
import "./Spam.css";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import { getSpamPosts } from '../../../redux/actions/adminAction';

const Spam = () => {
  const { auth, admin } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpamPosts(auth.token));
  }, [dispatch, auth.token])


  return (
    <>
      <div className="admin-panel-heading px-2 py-4">
        <h1>Hello {auth.user.username}</h1>
        <p>Welcome to your Spam Management.</p>
      </div>
      <div className="spam mt-4">
        <ContentList content={admin.spam_posts} />
      </div>
    </>
  );
};

export default Spam;
