import React from 'react';
import './Main.scss';
import Header from './Header';
import Footer from './Footer';
import SearchBar from "../../components/SearchBar";

const Main = () => {
  return (
    <section className="main">
      <Header/>
      <main>
        <section className="search">
          <h1>오늘 맛있는거 먹었다!</h1>
          <input type="text" placeholder="어떤 가게를 방문하셨나요?"/>
          <div className="bar">
          <SearchBar
          
          />
          </div>
        </section>
        <section className="result">
        
        </section>
        <section className="diary">
          <h4>그동안 얼마나 먹은거야...?</h4>
        </section>
      </main>
      <Footer/>
    </section>
  );
};

export default Main;