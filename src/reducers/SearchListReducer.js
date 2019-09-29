export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const SELECT_PLACE = 'SELECT_PLACE';
export const HIDE_SEARCH_LIST = 'HIDE_SEARCH_LIST';
export const CLEAR_PLACE_LIST = 'CLEAR_PLACE_LIST';

export default (state, [type, payload]) => {
	switch (type) {
		case SET_SEARCH_LIST:
			return {
				list: payload,
				selectedIndex: 0,
				isShowList: true
			};
		case SELECT_PLACE:
			return {
				...state,
				selectedIndex: payload
			};
		case HIDE_SEARCH_LIST:
			return {
				...state,
				isShowList: false
			};
		case CLEAR_PLACE_LIST:
			return {
				...state,
				list: []
			};
		default:
			return state;
	}
};