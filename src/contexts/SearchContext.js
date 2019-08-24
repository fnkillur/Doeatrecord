import React, {createContext, useReducer} from "react";
import SearchReducer from "../reducers/SearchReducer";

const SearchContext = createContext({});
const {Provider} = SearchContext;

const initState = {
  searchList: [],
  selectedPlace: {}
};

const SearchProvider = ({children}) => {
  const [state, dispatch] = useReducer(SearchReducer, initState);
  
  return (
    <Provider value={{state, dispatch}}>
      {children}
    </Provider>
  );
};

export {
  SearchContext,
  SearchProvider
}
