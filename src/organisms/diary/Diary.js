import React from 'react';
import {Route} from "react-router-dom";
import List from "./List";
import Map from "./Map";
import Stats from "./Stats";

const Diary = ({match: {url}}) => (
  <>
    <Route path={`${url}/list`} component={List}/>
    <Route path={`${url}/map`} component={Map}/>
    <Route path={`${url}/stats`} component={Stats}/>
  </>
);

export default Diary;