export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';

export default (state, [type, payload]) => {
  switch (type) {
    case SET_SEARCH_LIST:
      return {...state, searchList: payload};
    default:
      return state;
  }
};