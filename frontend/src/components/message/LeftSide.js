import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { addUser, getConversations } from "../../redux/actions/messageAction";
import { getDataAPI } from '../../utils/fetchData';
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const LeftSide = ({ setShowChats }) => {
  const { auth, message } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!search) return;
    try {
      setLoading(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  useEffect(() => {
    handleSearch()
  }, [search])

  const handleAddUser = (user) => {
    setSearch('');
    setUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return 'active';
    return '';
  }

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  return (
    <div className='border h-100'>
      <div className="search_message_box">
        <form className="search_form" onSubmit={(e) => {
          e.preventDefault()
        }}>

          <div className="d-flex bg-light rounded px-2 align-items-center">
            <label htmlFor="searchuser" className="d-flex align-items-center justify-content-center border-end">
              <span className="material-icons cursor-pointer">search</span>
            </label>
            <input
              className="p-1"
              type="text"
              placeholder={"Search..."}
              name="search"
              value={search}
              id="searchuser"
              onChange={(e) =>
                setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
              }
            />
          </div>

          <div
            onClick={handleClose}
            className="close_search"
            style={{ display: search.length === 0 ? "none" : "block" }}
          >
            &times;
          </div>

          <div className="users">
            {
              !loading ?
                (search && users.length >= 1) ? users.map((user) => (
                  <div
                    key={user._id}
                    className={`message_user ${isActive(user)} cursor-pointer border`}
                    onClick={() => handleAddUser(user)}
                  >
                    <UserCard user={user} />
                  </div>
                ))
                  : search && <div className="p-2 text-center border border-2 bg-light">No Record Found!</div>
                : <div className="text-center p-2 border bg-light"><img width={30} src={LoadIcon} alt="Loading" /></div>}
          </div>
        </form>
      </div>

      <div className="message_chat_list">
        {message.users.length > 0 ? message.users.map((user) => (
          <div
            key={user._id}
            className={`message_user ${isActive(user)} cursor-pointer border-bottom`}
            onClick={() => {
              setShowChats(false)
              handleAddUser(user)
            }}
          >
            <UserCard user={user} msg={true} >
              <i className="fas fa-circle" />
            </UserCard>
          </div>
        )) : <div className='text-center mt-3 fw-bold text-muted'>Try Search to chat with friends.</div>}

        <button style={{ opacity: 0 }} ref={pageEnd}>Load more..</button>
      </div>
    </div>
  );
}

export default LeftSide
