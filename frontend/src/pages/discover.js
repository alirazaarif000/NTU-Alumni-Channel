import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverPosts, DISCOVER_TYPES } from "../redux/actions/discoverAction";
import LoadIcon from '../images/loading.gif';
import PostThumb from "../components/PostThumb";
import LoadMoreBtn from '../components/LoadMoreBtn';
import { getDataAPI } from '../utils/fetchData';

const Discover = () => {
  const { auth, discover } = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(discover);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`post_discover?num=${discover.page * 8}`, auth.token);
    dispatch({ type: DISCOVER_TYPES.UPDATE_POSTS, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      {discover.loading ? (
        <div className="text-center p-2 mt-4"><img width={30} src={LoadIcon} alt="Loading" /></div>
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {load && (
        <div className="text-center p-2"><img width={30} src={LoadIcon} alt="Loading" /></div>
      )}

      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
      
    </div>
  );
}

export default Discover;
