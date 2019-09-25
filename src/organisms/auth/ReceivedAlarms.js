import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {ClipLoader} from "react-spinners";
import Emoji from "react-emoji-render";

const GET_RECEIVED_ALARMS = gql`
  query GetReceivedAlarms($targetId: String!) {
    receivedAlarms(targetId: $targetId) {
      _id
      applicantId
      applicantName
      type
    }
  }
`;

const DECIDE_ALARM = gql`
  mutation DecideAlarm($_id: ID!, $result: String!, $type: String!, $myId: String!, $applicantId: String!) {
    decideAlarm(_id: $_id, result: $result, type: $type, myId: $myId, applicantId: $applicantId)
  }
`;

const initDecideInfo = {_id: '', result: '', type: '', myId: '', applicantId: ''};

const ReceivedAlarms = ({myId}) => {
  
  const {loading, error, data} = useQuery(GET_RECEIVED_ALARMS, {variables: {targetId: myId}});
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    data && setAlarms(data.receivedAlarms);
  }, [data]);
  
  const [decideAlarm] = useMutation(DECIDE_ALARM);
  const [decideInfo, setDecideInfo] = useState(initDecideInfo);
  useEffect(() => {
    const decide = async () => {
      const result = await decideAlarm({variables: decideInfo});
      result ? alert('요청이 처리되었습니다.') : alert('요청이 처리되지 않았습니다.');
      setDecideInfo({...initDecideInfo});
      setAlarms(alarms.filter(({_id}) => _id !== decideInfo._id));
    };
    
    decideInfo._id && decide();
  }, [decideInfo._id]);
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>받은 요청들을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
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
                className="btn btn-no"
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