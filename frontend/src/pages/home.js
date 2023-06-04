import React from 'react';
import { useSelector } from "react-redux";

import Posts from '../components/home/Posts';
import Status from '../components/home/Status';
import RightSideBar from "../components/home/RightSideBar";

import LoadIcon from '../images/loading.gif'


const Home = () => {
  const { homePosts } = useSelector(state => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {homePosts.loading ? (
          <div className="text-center p-2"><img width={30} src={LoadIcon} alt="Loading" /></div>
        ) : (homePosts.result === 0 ?
          <div className='text-center mt-4 border border-dark border-2 rounded p-3 mx-auto' style={{ maxWidth: "768px" }}>
            <h2 className='m-0'>No Post Found!</h2>
          </div> : <Posts />
        )}
      </div>

      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Home;
