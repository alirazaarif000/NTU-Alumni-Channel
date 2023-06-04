import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageShow, videoShow } from "../utils/mediaShow";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0) {
    return (
      <div className='text-center mt-4 border border-dark border-2 rounded p-3 mx-auto' style={{maxWidth: "768px"}}>
        <h2 className='m-0'>No Post Found!</h2>
      </div>
    )
  }

  const imageShow = (src) => {
    return (
      <img
        src={src}
        alt={src}
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
    );
  };

  const videoShow = (src) => {
    return (
      <video
        controls
        src={src}
        alt={src}
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
    );
  };
  return (
    <div className="post_thumb">
      {posts && posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <div className="post_thumb_display">
            {post.images[0].url.match(/video/i)
              ? videoShow(post.images[0].url, theme)
              : imageShow(post.images[0].url, theme)
            }
            <div className="post_thumb_menu">
              <i className="far fa-thumbs-up">{post.likes.length}</i>
              <i className="far fa-comments">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb
