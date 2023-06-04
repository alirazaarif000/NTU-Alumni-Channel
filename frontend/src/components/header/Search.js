import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
// import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

  return (
    <form className="search_form" onSubmit={(e) => {
      e.preventDefault()
    }}>

      <div className="d-flex bg-light rounded px-2 py-1 align-items-center">
        <label htmlFor="search" className="d-flex align-items-center justify-content-center border-end">
          <span className="material-icons cursor-pointer">search</span>
        </label>
        <input
          className="p-1"
          type="text"
          placeholder={"Search..."}
          name="search"
          value={search}
          id="search"
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
              <UserCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            )) : search && <div className="p-2 text-center border border-2 bg-light">No Record Found!</div>
            : <div className="text-center p-2 border bg-light"><img width={30} src={LoadIcon} alt="Loading" /></div>}
      </div>
    </form>
  );
};

export default Search;
