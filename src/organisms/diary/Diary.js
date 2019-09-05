import React from 'react';
import {Route} from "react-router-dom";
import List from "./List";
import Map from "./Map";
import Stats from "./Stats";
import "./Diary.scss";

const Diary = ({match: {url}}) => (
  <main className="diary">
    <Route path={`${url}/list`} component={List}/>
    <Route path={`${url}/map`} component={Map}/>
    <Route path={`${url}/stats`} component={Stats}/>
  </main>
);

export default Diary;