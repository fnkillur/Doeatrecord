import React from 'react';
import {Route, Switch} from "react-router-dom";
import List from "./List";
import Map from "../record/Map";
import Stats from "./Stats";

const Diary = () => (
  <Switch>
    <Route path="/diary/list" component={List}/>
    <Route path="/diary/map" component={Map}/>
    <Route path="/diary/stats" component={Stats}/>
  </Switch>
);

export default Diary;