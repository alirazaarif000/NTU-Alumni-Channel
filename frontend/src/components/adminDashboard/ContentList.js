import React from 'react'
import Avatar from '../Avatar';
import { deleteSpamPost } from '../../redux/actions/adminAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ContentList = ({ content }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = (post) => {
    dispatch(deleteSpamPost({ post, auth, socket }));
  };
  return (
    <div>
      {content.length > 0 ? (
        content.map((post) => (
          <div className="admin_content_display">
            
            <div className="d-flex align-items-center">
              <Avatar size="big-avatar" src={post.user.avatar} />
              <div className="d-flex flex-column ms-2">
                <span className="spam_username">{post.user.username}</span>
                <span className="spam_email">{post.user.email}</span>
              </div>
              {/* <span className="text-muted fw-normal"  style={{width: "122px"}}>
                ~{moment(post.createdAt).fromNow()}
              </span> */}
            </div>

            <div
              className="ms-auto d-flex flex-column"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeletePost(post)}
            >
              <span className="material-icons">delete</span>

            </div>
            <span className="border-start border-2 ps-2 m-0">
              Reports: {post.reports.length}
            </span>
          </div>
        ))
      ) : (
        <h4 className='text-center m-0 p-0'>No Spam Posts!</h4>
      )}
    </div>
  );
}

export default ContentList
