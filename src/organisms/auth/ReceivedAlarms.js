import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {ClipLoader} from "react-spinners";
import Emoji from "react-emoji-render";

const GET_RECEIVED_ALARMS = gql`
  query GetReceivedAlarms($target: String!) {
    receivedAlarms(target: $target) {
      applicant
      completed
      result
      created
    }
  }
`;

const ReceivedAlarms = ({me}) => {
  
  const {loading, error, data} = useQuery(GET_RECEIVED_ALARMS, {variables: {target: me}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>받은 요청 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {alarms} = data;
  
  return (
    <>
      {
        alarms.map(({applicant, completed, result, created}) => {
          return null;
        })
      }
    </>
  );
};

export default ReceivedAlarms;