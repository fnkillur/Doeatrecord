import React, {useContext, useEffect, useRef, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCreditCard, faListOl} from "@fortawesome/free-solid-svg-icons";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {SearchListContext} from "../../contexts/SearchListContext";
import {getMe, isNumber} from "../../_common/utils";
import Place from "../../components/Place";
import "./Record.scss";

const CREATE_RECORD = gql`
  mutation CreateRecord($input: NewRecord!) {
    createRecord(input: $input) {
      userId
      placeId
      placeName
      category
      address
      visitedDate
      visitedYear
      visitedMonth
      menus
      money
      created
    }
  }
`;

const Record = () => {
  
  const datePickerEl = useRef(null);
  
  const {state: {list, selectedIndex}} = useContext(SearchListContext);
  const store = list[selectedIndex] || JSON.parse(sessionStorage.getItem("store"));
  const {placeId, placeName, category, address, url, x, y} = store;
  
  const [menus, setMenus] = useState('');
  const [money, setMoney] = useState('');
  const [visited, setVisited] = useState('');
  
  const [isRecord, setIsRecord] = useState(false);
  const [createRecord] = useMutation(CREATE_RECORD);
  
  useEffect(() => {
    const record = async () => {
      const {userId} = getMe();
      const visitedDate = new Date(visited);
      await createRecord({
        variables: {
          input: {
            userId,
            placeId,
            placeName,
            category,
            address,
            url,
            x,
            y,
            menus: menus.split(','),
            money,
            visitedDate,
            visitedYear: visitedDate.getFullYear(),
            visitedMonth: visitedDate.getMonth() + 1
          }
        }
      });
      location.href = `/main/diary/list/${userId}`;
    };
    isRecord && record();
  }, [isRecord]);
  
  const handleMoney = ({target: {value}}) => isNumber(value) && setMoney(value ? parseInt(value, 10) : '');
  
  return (
    <main className="record">
      <div className="field comment">여기서</div>
      <div className="field field-store">
        <Place store={store}/>
      </div>
      <div className="field field-input comment">이렇게 먹었다!</div>
      <div className="field">
        <FontAwesomeIcon icon={faCalendarAlt}/>
        <DayPickerInput
          ref={datePickerEl}
          className="record-day-picker"
          value={visited}
          onDayChange={selectedDay => {
            setVisited(selectedDay);
            datePickerEl.current.input.blur();
          }}
          placeholder="날이 좋아서 ..."
        />
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faListOl}/>
        <input
          type="text"
          className="input menu"
          placeholder="이런 메뉴를 ... 츄릅 (예시: 삼겹살, 비빔냉면)"
          value={menus}
          onChange={({target: {value}}) => setMenus(value)}
        />
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faCreditCard}/>
        <input
          type="text"
          className="input money"
          placeholder="돈은 이만큼 ... 헤헤"
          value={money}
          onChange={handleMoney}
        />
      </div>
      <div className="field btn-box">
        <button type="button" className="btn btn-record" onClick={() => setIsRecord(true)}>
          기록하자!
        </button>
      </div>
    </main>
  );
};

export default Record;