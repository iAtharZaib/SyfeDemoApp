import * as actionType from './actionTypes';


export const set_moviesList = (data) => {
  return {
    type: actionType.SET_MOVIES_LIST,
    data: data,
  };
};

export const set_popularMoviesList = (data) => {
  return {
    type: actionType.SET_POPULAR_MOVIES_LIST,
    data: data,
  };
};

export const set_latestMoviesList = (data) => {
  return {
    type: actionType.SET_LATEST_MOVIES_LIST,
    data: data,
  };
};