import React, {useEffect, useRef, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCreditCard, faListOl} from "@fortawesome/free-solid-svg-icons";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {getMe, isNumber} from "../../_common/utils";
import Place from "../../components/Place";
import "./Record.scss";

const CREATE_RECORD = gql`
  mutation ($input: NewRecord!) {
    createRecord(input: $input)
  }
`;

const Record = () => {
  
  const datePickerEl = useRef(null);
  
  const place = JSON.parse(sessionStorage.getItem("place"));
  const {
    placeId, placeName, category, address, url, x, y,
    _id,
    isModify,
    menus: modifyMenus,
    visitedDate: modifyVisitedDate,
    money: modifyMoney,
    isDutch: modifyIsDutch
  } = place;
  
  const [visited, setVisited] = useState(modifyVisitedDate ? new Date(modifyVisitedDate) : new Date());
  const [menus, setMenus] = useState(modifyMenus ? modifyMenus.join(', ') : '');
  const [money, setMoney] = useState(modifyMoney || '');
  const [isDutch, setIsDutch] = useState(modifyIsDutch === undefined ? true : modifyIsDutch);
  
  const [isRecord, setIsRecord] = useState(false);
  const [createRecord] = useMutation(CREATE_RECORD);
  
  useEffect(() => {
    const record = async () => {
      const {myId} = getMe();
      const visitedDate = new Date(visited);
      const result = await createRecord({
        variables: {
          input: {
            _id,
            userId: myId,
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
            visitedMonth: visitedDate.getMonth() + 1,
            isDutch
          }
        }
      });
      result ? location.href = `/main/diary/list/${myId}` : alert('기록하는데 문제가 있습니다.');
    };
    isRecord && record();
  }, [isRecord]);
  
  const handleMoney = ({target: {value}}) => isNumber(value) && setMoney(value ? parseInt(value, 10) : '');
  
  return (
    <main className="record">
      <div className="field comment">여기서</div>
      <div className="field field-store">
        <Place place={place}/>
      </div>
      <div className="field field-input comment">이렇게 먹었다!</div>
      <div className="field">
        <FontAwesomeIcon icon={faCalendarAlt}/>
        <DayPickerInput
          ref={datePickerEl}
          value={visited}
          onDayChange={selectedDay => {
            setVisited(selectedDay);
            datePickerEl.current.input.blur();
          }}
          placeholder="방문한 날짜를 선택해보세요."
        />
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faListOl}/>
        <input
          type="text"
          className="input menu"
          placeholder="먹었던 음식을 입력해보세요. (쉼표로 구분)"
          value={menus}
          onChange={({target: {value}}) => setMenus(value)}
        />
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faCreditCard}/>
        <input
          type="tel"
          className="input money"
          placeholder="사용한 돈을 숫자로 입력해보세요."
          value={money}
          onChange={handleMoney}
        />
      </div>
      <div className="field">
        더치페이 대상인가요?
        <input type="checkbox" className="input-not-dutch" checked={isDutch} onChange={() => setIsDutch(!isDutch)}/>
      </div>
      <div className="field btn-box">
        <button type="button" className="btn btn-record" onClick={() => setIsRecord(true)}>
          {isModify ? '수정하기' : '기록하기'}
        </button>
      </div>
    </main>
  );
};

export default Record;