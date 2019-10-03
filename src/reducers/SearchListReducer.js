export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const SELECT_PLACE = 'SELECT_PLACE';
export const CLEAR_PLACE_LIST = 'CLEAR_PLACE_LIST';
export const TOGGLE_SEARCHED = 'TOGGLE_SEARCHED';

export default (state, [type, payload]) => {
  switch (type) {
    case SET_SEARCH_LIST:
      return {
        ...state,
        list: payload,
        selectedIndex: 0,
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedIndex: payload
      };
    case CLEAR_PLACE_LIST:
      return {
        ...state,
        list: [],
        selectedIndex: -1
      };
    case TOGGLE_SEARCHED:
      return {
        ...state,
        isSearched: payload
      };
    default:
      return state;
  }
};