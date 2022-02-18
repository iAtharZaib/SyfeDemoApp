import * as actionType from '../actions/actionTypes';

const initState = {
  moviesList:[],
  popularMoviesList:[],
  latestMoviesList:[]
};

const mainReducer = (state = initState, action) => {
  switch (action.type) {

    case actionType.SET_MOVIES_LIST:
    return {
      ...state,
      moviesList : action.data,
    };
    case actionType.SET_LATEST_MOVIES_LIST:
    return {
      ...state,
      latestMoviesList : action.data,
    };
    case actionType.SET_POPULAR_MOVIES_LIST:
    return {
      ...state,
      popularMoviesList : action.data,
    };
    default:
      return state;
  }
};

export default mainReducer;
