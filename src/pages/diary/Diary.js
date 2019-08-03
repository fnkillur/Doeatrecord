import React from 'react';
import {Route, Switch} from "react-router-dom";
import List from "./List";
import Map from "../record/Map";
import Stats from "./Stats";

const Diary = () => {
  return (
    <Switch>
      <Route path="/main/diary/list" component={List}/>
      <Route path="/main/diary/map" component={Map}/>
      <Route path="/main/diary/stats" component={Stats}/>
    </Switch>
  );
};

export default Diary;