export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const SELECT_PLACE = 'SELECT_PLACE';

export default (state, [type, payload]) => {
  switch (type) {
    case SET_SEARCH_LIST:
      return {...state, searchList: payload};
    case SELECT_PLACE:
      return {...state, selectedPlace: payload};
    default:
      return state;
  }
};