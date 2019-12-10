import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const DECIDE_ALARM = gql`
  mutation ($_id: ID!, $result: String!, $type: String!, $myId: String!, $applicantId: String!) {
    decideAlarm(_id: $_id, result: $result, type: $type, myId: $myId, applicantId: $applicantId)
  }
`;

const initDecideInfo = {_id: '', result: '', type: '', myId: '', applicantId: ''};

const ReceivedAlarms = ({myId, receivedAlarms}) => {
  
  const [alarms, setAlarms] = useState(receivedAlarms);
  
  const [decideAlarm] = useMutation(DECIDE_ALARM);
  const [decideInfo, setDecideInfo] = useState(initDecideInfo);
  
  useEffect(() => {
    const decide = async () => {
      const result = await decideAlarm({variables: decideInfo});
      alert(result ? '요청이 처리되었습니다.' : '요청이 처리되지 않았습니다.');
      setDecideInfo({...initDecideInfo});
      setAlarms(alarms.filter(({_id}) => _id !== decideInfo._id));
    };
    
    decideInfo._id && decide();
  }, [decideInfo._id]);
  
  return (
    <>
      {
        alarms.map(({_id, applicantId, applicantName, type}, i) => i < 2 && (
          <div key={_id} className="alarm-receive">
            <div>{`${applicantName}님이 우리가 ${type === 'couple' ? '커플이' : '친구 '}라는데요?`}</div>
            <div className="alarm-btn">
              <button
                type="button"
                className="btn btn-ok"
                onClick={() => setDecideInfo({_id, result: 'accept', type, myId, applicantId})}
              >
                맞아
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setDecideInfo({_id, result: 'reject', type, myId, applicantId})}
              >
                아닌데
              </button>
            </div>
          </div>
        ))
      }
      {
        alarms.length ? <hr className="section-divider"/> : null
      }
    </>
  );
};

export default ReceivedAlarms;
