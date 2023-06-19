import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, JOB_TYPES } from "../redux/actions/jobAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { postDataAPI } from "../utils/fetchData";
import JobsModal from "../components/modal/JobsModal";
import LoadIcon from "../images/loading.gif";

const Jobs = () => {
  const { auth } = useSelector((state) => state);
  const [postModal, setPostModal] = useState(false);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState();
  useEffect(() => {
    dispatch(getJobs(auth)).then((result) => {
      setJobs(result);
    });
  }, [dispatch, auth]);

  const [isLoading, setIsLoading] = useState(true);
  const [jobPostData, setJobPostData] = useState({
    title: "",
    company: "",
    location: "",
    alphabets: "",
    duration: "",
    salary: "",
    link: "",
  });

  const handleJobDataInput = (e) => {
    const { name, value } = e.target;
    setJobPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDataAPI("jobs", { ...jobPostData }, auth.token);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "New Job added successfully!" },
      });

      // Add the new job to the existing jobs array
      const updatedJobs = [...jobs, jobPostData];
      setJobs(updatedJobs);
      setJobPostData({
        title: "",
        company: "",
        location: "",
        alphabets: "",
        duration: "",
        salary: "",
        link: "",
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
    setPostModal(false);
  };
  useEffect(() => {
    dispatch(getJobs(auth))
      .then((result) => {
        setJobs(result);
        setIsLoading(false); // Set loading state to false when data is loaded
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading state to false on error
      });
  }, [dispatch, auth]);

  return (
    <>
      <div className="row">
        {(auth.user.userType === "teacher" ||
          auth.user.userType === "alumni") && (
          <div style={{ margin: "0px 0px 15px 120px" }}>
            <div className="row m-0 mt-3">
              <div className="job-button col-6 m-12 p-0">
                <button
                  className="app-button me-md-2 p-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addnewjobpost"
                >
                  ADD New Job
                </button>
              </div>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="text-center p-2 mt-4">
            <img width={30} src={LoadIcon} alt="Loading" />
          </div>
        ) : (
          <div className="col-lg-10 mx-auto">
            <div className="filter-result">
              {jobs?.map((job) => (
                <div
                  className="job-box d-md-flex align-items-center justify-content-between mb-30"
                  key={job._id}
                >
                  <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                      {job.alphabets}
                    </div>
                    <div className="job-content">
                      <h5 className="text-center text-md-left">{job.title}</h5>
                      <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li className="salary mr-md-6 d-flex">
                          <span className="material-icons mr-5">
                            corporate_fare
                          </span>
                          {job.company}
                        </li>
                        <li className="mr-md-6">
                          <i className="zmdi zmdi-pin mr-2"></i> {job.location}
                        </li>
                        <li className="salary mr-md-6 d-flex">
                          <span className="material-icons mr-5">payments</span>
                          {job.salary}
                        </li>
                        <li className="mr-md-6">
                          <i className="zmdi zmdi-time mr-2"></i> {job.duration}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="job-right my-4 flex-shrink-0">
                    <div
                      className="btn-group d-flex justify-content-between"
                      role="group"
                    >
                      <div className="btn btn-light ">
                        <button
                          className="app-button me-md-2 p-2"
                          onClick={() => window.open(job.link, "_blank")}
                        >
                          Apply now
                        </button>
                      </div>
                      {(auth.user.userType === "teacher" ||
                        auth.user.userType === "alumni") && (
                        <div className="btn btn-light">
                          <button
                            className="app-button me-md-2 p-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#jobModal${job._id}`}
                          >
                            View
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {jobs?.map((job, index) => (
        <JobsModal
          key={job._id || index}
          job={{
            _id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            alphabets: job.alphabets,
            duration: job.duration,
            salary: job.salary,
            link: job.link,
          }}
          jobs={jobs}
          setJobs={setJobs}
        />
      ))}

      <div
        className="modal fade"
        id="addnewjobpost"
        tabIndex="-1"
        aria-labelledby="addnewjobpostlabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addnewjobpostlabel">
                Add New Job
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
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
                    placeholder="Mern Stack"
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
                    placeholder="Devsinc"
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
                    placeholder="Faisalabad"
                    value={jobPostData.location}
                    onChange={handleJobDataInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="alphabets" className="form-label">
                    Title Alphabets
                  </label>
                  <input
                    type="alphabets"
                    className="form-control"
                    id="alphabets"
                    name="alphabets"
                    placeholder="Mern Stack (MS)"
                    value={jobPostData.alphabets}
                    onChange={handleJobDataInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="duration"
                    className="form-control"
                    id="duration"
                    name="duration"
                    placeholder="Full Time, Part Time, Contract"
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
                    placeholder="100K"
                    value={jobPostData.salary}
                    onChange={handleJobDataInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="link " className="form-label">
                    Job Link
                  </label>
                  <input
                    type="link"
                    className="form-control"
                    id="link"
                    name="link"
                    placeholder="wwww.linkedin.com"
                    value={jobPostData.link}
                    onChange={handleJobDataInput}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  ADD New Job
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Jobs;
