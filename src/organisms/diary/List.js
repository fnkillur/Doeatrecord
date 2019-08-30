import React from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {getMe} from "../../_common/utils";
import Error from "../../components/Error";

const GET_RECORDS = gql`
  query getMyRecords($userId: String!) {
    Record(userId: $userId) {
      userId
      placeId
      category
      x
      y
      money
      menus
      created
      updated
      isDelete
    }
  }
`;

const List = () => {
	
	const {loading, error, data} = useQuery(GET_RECORDS, {
		variables: {userId: getMe()},
	});
	
	if (loading) return null;
	if (error) return <Error message={error.toString()}/>;
	
	return (
		<div>
			{data}
		</div>
	);
};

export default List;