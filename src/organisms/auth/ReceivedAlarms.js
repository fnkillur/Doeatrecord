import React from "react";
import {useQuery} from "@apollo/react-hooks";
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
      completed
    }
  }
`;

const ReceivedAlarms = ({myId, myName}) => {
  
  const {loading, error, data} = useQuery(GET_RECEIVED_ALARMS, {variables: {targetId: myId}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>받은 요청들을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {receivedAlarms} = data;
  console.log(receivedAlarms);
  return (
    <>
      {
        receivedAlarms.map(({_id, applicantName, type, completed}) => (
          <div key={_id} className="alarm-receive">
            <div>{`${applicantName}님이 ${myName}님에게 ${type}요청을 하셨습니다.`}</div>
            <button type="button" className="btn">수락</button>
            <button type="button" className="btn">거절</button>
          </div>
        ))
      }
    </>
  );
};

export default ReceivedAlarms;