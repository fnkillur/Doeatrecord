import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const OFF_ALARM = gql`
  mutation ($_id: ID!) {
    offAlarm(_id: $_id)
  }
`;

const RequestedAlarms = ({requestedAlarms}) => {
  
  const [alarms, setAlarms] = useState(requestedAlarms);
  
  const [offAlarm] = useMutation(OFF_ALARM);
  const [offAlarmId, setOffAlarmId] = useState('');
  
  useEffect(() => {
    const off = async () => {
      const result = await offAlarm({variables: {_id: offAlarmId}});
      !result && console.error('알람 끄기 중 에러 발생');
      setOffAlarmId('');
      setAlarms(alarms.filter(({_id}) => _id !== offAlarmId));
    };
    
    offAlarmId && off();
  }, [offAlarmId]);
  
  return (
    <>
      {
        alarms.map(({_id, targetId, targetName, type, result}, i) => i < 2 && (
          <div key={_id} className="alarm-receive">
            <div>{`${targetName}님이 ${type === 'couple' ? '커플' : '친구 '}요청을 ${result === 'rejected' ? '거절' : '수락'}했습니다.`}</div>
            <div className="alarm-btn">
              <FontAwesomeIcon icon={faTimes} onClick={() => setOffAlarmId(_id)}/>
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

export default RequestedAlarms;