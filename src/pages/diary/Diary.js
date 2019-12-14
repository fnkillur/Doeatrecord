import React from 'react';
import {Route} from "react-router-dom";
import List from "./List";
import Map from "./Map";
import Stats from "./Stats";

const Diary = ({match: {url}}) => (
  <>
    <Route path={`${url}/list/:userId`} component={List}/>
    <Route path={`${url}/map/:userId`} component={Map}/>
    <Route path={`${url}/stats/:userId`} component={Stats}/>
  </>
);

export default Diary;
