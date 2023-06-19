import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const JOB_TYPES = {
  LOADING: "LOADING_JOBS",
  GET_JOBS: "GET_JOBS",
};

export const getJobs = (auth) => async (dispatch) => {
  try {
    dispatch({ type: JOB_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`jobs`, auth.token);
    //console.log(res.data);
    dispatch({ type: JOB_TYPES.GET_JOBS, payload: res.data });
    dispatch({ type: JOB_TYPES.LOADING, payload: false });

    return res.data.jobs;
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
