import React, {createContext, useState} from "react";

const SearchContext = createContext({});
const {Provider} = SearchContext;

const SearchProvider = ({children}) => {
  const [place, setPlace] = useState({});
  
  return (
    <Provider value={{place, setPlace}}>
      {children}
    </Provider>
  );
};

export {
  SearchContext,
  SearchProvider
}
