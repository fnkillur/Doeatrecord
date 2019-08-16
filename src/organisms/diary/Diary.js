import React, {Fragment} from 'react';
import {Route} from "react-router-dom";
import List from "./List";
import Map from "./Map";
import Stats from "./Stats";

const Diary = () => (
  <Fragment>
    <Route path="/diary/list" component={List}/>
    <Route path="/diary/map" component={Map}/>
    <Route path="/diary/stats" component={Stats}/>
  </Fragment>
);

export default Diary;