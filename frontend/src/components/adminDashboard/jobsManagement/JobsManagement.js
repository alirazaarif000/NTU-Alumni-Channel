import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../../../utils/fetchData';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import JobsModal from '../../modal/JobsModal';
import LoadIcon from '../../../images/loading.gif'

const JobsManagement = ({ ROLE }) => {
  const { auth } = useSelector((state) => state);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const [jobPostData, setJobPostData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: ""
  });

  const [postModal, setPostModal] = useState(false);

  const handleJobDataInput = (e) => {
    const { name, value } = e.target;
    setJobPostData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDataAPI('jobs', { ...jobPostData }, auth.token);
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
        description: "",
        requirements: "",
        salary: ""
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
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await getDataAPI(`jobs?search=${searchQuery}`, auth.token);
        setJobs(res.data.jobs);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    };

    fetchUsers();
  }, [auth.token, dispatch, searchQuery, ROLE]);

  return (
    <>
      <div className="admin-panel-heading px-2 py-4">
        <h1>Hello {auth.user.username}</h1>
        <p>Welcome to your {ROLE}s Management.</p>
      </div>
      <div className="row m-0 mt-3">
        <div className="col-6 m-0 p-0">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addnewjobpost"
          >
            ADD New Job
          </button>
        </div>

        <div className="col-6 p-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive mt-3">
        {!loading ? jobs.length >= 1 ?
          <table className="table table-bordered custom-table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Company</th>
                <th scope="col">Salary</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job, index) => (
                <tr key={job._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.salary}</td>
                  <td>
                    <button
                      className="btn btn-info text-light"
                      data-bs-toggle="modal"
                      data-bs-target={`#jobModal${job._id}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> :
          <div className='text-center mt-4 border border-dark border-2 rounded p-3 mx-auto' style={{ maxWidth: "768px" }}>
            <h2 className='m-0'>No Jobs Found!</h2>
          </div> :
          <div className="text-center p-2 mt-4"><img width={30} src={LoadIcon} alt="Loading" /></div>
        }
      </div>

      {jobs.map((job, index) => (
        <JobsModal
          key={job._id || index}
          job={{
            _id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            description: job.description,
            requirements: job.requirements,
            salary: job.salary,
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
                ADD New Job
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
                    Description
                  </label>
                  <input
                    type="description"
                    className="form-control"
                    id="description"
                    name="description"
                    value={jobPostData.description}
                    onChange={handleJobDataInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">
                    Requirements
                  </label>
                  <input
                    type="requirements"
                    className="form-control"
                    id="requirements"
                    name="requirements"
                    value={jobPostData.requirements}
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

export default JobsManagement;
