import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const JobsModal = ({ job, jobs, setJobs }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [jobPostData, setJobPostData] = useState({ ...job });

  const handleJobDataInput = (e) => {
    const { name, value } = e.target;
    setJobPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [postModal, setPostModal] = useState(false);

  const handleUpdate = async () => {
    try {
      await patchDataAPI(`/jobs/${job._id}`, { ...jobPostData }, auth.token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "Job Updated successfully!" },
      });

      const updatedJobs = jobs.map((item) => {
        if (item._id === job._id) {
          return { ...jobPostData };
        }
        return item;
      });

      setJobs(updatedJobs);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }

    setPostModal(!postModal);
  };

  const handleDelete = async () => {
    try {
      await deleteDataAPI(`/jobs/${job._id}`, auth.token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "Job Deleted successfully!" },
      });

      const updatedJobs = jobs?.filter((item) => item._id !== job._id);

      setJobs(updatedJobs);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
    setPostModal(!postModal);
  };

  return (
    <div
      className="modal fade"
      id={`jobModal${job._id}`}
      tabIndex="-1"
      aria-labelledby={`jobModalLabel${job._id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`jobModalLabel${job._id}`}>
              Job Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="title"
                className="form-control"
                id="title"
                name="title"
                value={jobPostData.title}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                type="company"
                className="form-control"
                id="company"
                name="company"
                value={jobPostData.company}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="location"
                className="form-control"
                id="location"
                name="location"
                value={jobPostData.location}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Job Alphabets
              </label>
              <input
                type="description"
                className="form-control"
                id="description"
                name="description"
                value={jobPostData.alphabets}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="requirements" className="form-label">
                Duration
              </label>
              <input
                type="requirements"
                className="form-control"
                id="requirements"
                name="requirements"
                value={jobPostData.duration}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="salary"
                className="form-control"
                id="salary"
                name="salary"
                value={jobPostData.salary}
                onChange={handleJobDataInput}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Job Link
              </label>
              <input
                type="link"
                className="form-control"
                id="link"
                name="link"
                value={jobPostData.link}
                onChange={handleJobDataInput}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsModal;
