import { JOB_TYPES } from '../actions/jobAction';

const initialState = {
  loading: false,
  jobs: [],
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case JOB_TYPES.GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    default:
      return state;
  }
};

export default jobReducer;
