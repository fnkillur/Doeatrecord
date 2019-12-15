import React, {useEffect, useState} from "react";
import Swipeout from "rc-swipeout";
import Place from "../../components/Place";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const DELETE_RECORD = gql`
  mutation ($_id: ID!) {
    deleteRecord(_id: $_id)
  }
`;

const SwipeRecord = ({_id, placeId, place, refetch, goToModify}) => {
  
  const [deleteRecord] = useMutation(DELETE_RECORD);
  const [deletingId, setDeletingId] = useState('');
  
  useEffect(() => {
    const doDelete = async () => {
      const result = await deleteRecord({variables: {_id: deletingId}});
      result ? refetch() : alert('삭제에 실패했습니다.');
    };
    deletingId && doDelete();
  }, [deletingId]);
  
  return (
    <div style={{marginBottom: "10px"}}>
      <Swipeout
        left={[
          {
            text: '수정',
            onPress: () => {
              sessionStorage.setItem("place", JSON.stringify({...place, _id, isModify: true}));
              goToModify(`/main/record/${placeId}`);
            },
            style: {backgroundColor: 'orange', color: 'white'},
            className: 'custom-class-1'
          }
        ]}
        right={[
          {
            text: '삭제',
            onPress: () => confirm('정말 이 기록을 삭제하시겠습니까?') && setDeletingId(_id),
            style: {backgroundColor: 'red', color: 'white'},
            className: 'custom-class-2'
          }
        ]}
        autoClose={true}
      >
        <Place place={place}/>
      </Swipeout>
    </div>
  );
};

export default SwipeRecord;
