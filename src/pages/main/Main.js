import React, {useState} from 'react';
import './Main.scss';
import Header from './Header';
import Footer from './Footer';
import SearchBar from '../../components/SearchBar';
import Map from '../record/Map';
import Nav from './Nav';

const Main = () => {
  
  const [searchText, setSearchText] = useState('');
  
  const searchStore = searchText => {
    setSearchText(searchText);
  };
  
  return (
    <section className="main">
      <Header/>
      <main>
        <section className="title-box">
          <span className="title">
            <strong>오늘 맛있는거 먹었다!</strong>
          </span>
        </section>
        <SearchBar
          placeholder="어떤 가게를 방문하셨나요?"
          onKeyEnter={searchStore}
        />
        {searchText && <Map searchText={searchText}/>}
        {!searchText && <Nav/>}
      </main>
      <Footer/>
    </section>
  );
};

export default Main;