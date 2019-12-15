import React, {useState} from "react";
import moment from "moment";
import Spending from "../../components/Spending";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RankedByCount from "../../organisms/diary/RankedByCount";
import RankedByScore from "../../organisms/diary/RankedByScore";
import "./Stats.scss";

const Stats = ({match: {params: {userId}}}) => {
  const [date, setDate] = useState(moment());
  
  const changeDate = isLeft => {
    const temp = moment(date);
    setDate(isLeft ? temp.subtract(1, 'month') : temp.add(1, 'month'));
  };
  
  return (
    <main className="stats">
      <section className="stats-header">
        <FontAwesomeIcon icon={faCaretLeft} onClick={() => changeDate(true)}/>
        <strong>{date.month() + 1}월</strong>
        <FontAwesomeIcon icon={faCaretRight} onClick={() => changeDate(false)}/>
      </section>
      <Spending userId={userId} now={date}/>
      <RankedByCount userId={userId} now={date}/>
      <RankedByScore userId={userId} now={date}/>
    </main>
  );
};

export default Stats;
