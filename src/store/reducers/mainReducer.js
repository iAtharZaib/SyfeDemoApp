import * as actionType from '../actions/actionTypes';

const initState = {
  
};

const mainReducer = (state = initState, action) => {
  switch (action.type) {

    case actionType.CART_GROCERYTOTAL:
    return {
      ...state,
      groceryTotal : action.data,
    };
    default:
      return state;
  }
};

export default mainReducer;
