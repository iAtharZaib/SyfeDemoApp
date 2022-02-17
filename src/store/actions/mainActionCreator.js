import * as actionType from './actionTypes';


export const set_popularProducts = (data) => {
  return {
    type: actionType.SET_POPULAR_PRODUCTS,
    data: data,
  };
};