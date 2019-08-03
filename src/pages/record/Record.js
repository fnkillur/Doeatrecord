import React, {useState} from "react";
import "./Record.scss"
import SearchBar from "../../components/SearchBar";
import Map from "./Map";

const Record = ({match}) => {
  
  const [searchText, setSearchText] = useState("");
  const searchStore = text => setSearchText(text);
  console.log(match);
  return (
    <main className="record">
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
    </main>
  );
};

export default Record;