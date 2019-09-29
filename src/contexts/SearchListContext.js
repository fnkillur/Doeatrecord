import React, {createContext, useReducer} from "react";
import SearchListReducer from "../reducers/SearchListReducer";

const SearchListContext = createContext(undefined);
const {Provider} = SearchListContext;

const initState = {
	list: [],
	selectedIndex: -1
};

const SearchListProvider = ({children}) => {
	const [state, dispatch] = useReducer(SearchListReducer, initState);
	
	return (
		<Provider value={{state, dispatch}}>
			{children}
		</Provider>
	);
};

export {
	SearchListContext,
	SearchListProvider
};
