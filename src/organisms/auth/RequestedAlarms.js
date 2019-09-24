import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import Emoji from "react-emoji-render";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GET_REQUESTED_ALARMS = gql`
  query GetRequestedAlarms($applicantId: String!) {
    requestedAlarms(applicantId: $applicantId) {
      _id
      targetId
      targetName
      type
      result
    }
  }
`;

const OFF_ALARM = gql`
  mutation OffAlram($_id: ID!) {
    offAlarm(_id: $_id)
  }
`;

const RequestedAlarms = ({myId}) => {
  
  const {loading, error, data} = useQuery(GET_REQUESTED_ALARMS, {variables: {applicantId: myId}});
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    data && setAlarms(data.requestedAlarms);
  }, [data]);
  
  
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
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>보낸 요청들을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
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