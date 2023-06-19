import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from "../../components/PostCard";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const { auth, detailPost } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPost({ detailPost, id, auth }));
      if (detailPost.length > 0) {
        const newArr = detailPost.filter((post) => post._id === id);
        setPost(newArr);
      }
    }, [detailPost, dispatch, id, auth]);

    return (
        <div className="posts-single">
            {
                post.length === 0 &&
                <div className="text-center p-2 "><img width={30} src={LoadIcon} alt="Loading" /></div>
            }

            {
                post.map(item => (
                    <PostCard post={item} key={item._id} />
                ))
            }
        </div>
    )
}

export default Post;
