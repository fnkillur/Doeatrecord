import React from 'react';
import Spending from "../../components/Spending";
import "./Stats.scss";

const Stats = ({match: {params: {userId}}}) => {
  return (
    <main className="stats">
      <section className="stats-header">
        <strong>{new Date().getMonth() + 1}월</strong>
      </section>
      <Spending userId={userId}/>
    </main>
  );
};

export default Stats;