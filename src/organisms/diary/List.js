import React from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {getMe} from "../../_common/utils";
import Error from "../../components/Error";
import ListItem from "../../components/ListItem";

const GET_RECORDS = gql`
  query Records($userId: String!) {
    records(userId: $userId) {
	    _id
      userId
      placeId
	    placeName
      category
      x
      y
	    visitedDate
      menus
      money
      created
      updated
      isDelete
    }
  }
`;

const List = () => {
	
	const {loading, error, data} = useQuery(GET_RECORDS, {
		variables: {userId: getMe().id},
	});
	
	if (loading) return <div>기록을 가져오는 중입니다...</div>;
	if (error) return <Error message={error.toString()}/>;
	
	const {records} = data;
	
	return (
		<main>
			{
				records.map(({_id, ...rest}) => <ListItem key={_id} record={{_id, ...rest}}/>)
			}
		</main>
	);
};

export default List;