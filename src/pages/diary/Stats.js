import React, {useState} from "react";
import Spending from "../../components/Spending";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Stats.scss";

const Stats = ({match: {params: {userId}}}) => {
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  
  return (
    <main className="stats">
      <section className="stats-header">
        <FontAwesomeIcon icon={faCaretLeft} onClick={() => setMonth(month - 1)}/>
        <strong>{month}월</strong>
        <FontAwesomeIcon icon={faCaretRight} onClick={() => setMonth(month + 1)}/>
      </section>
      <Spending userId={userId}/>
    </main>
  );
};

export default Stats;