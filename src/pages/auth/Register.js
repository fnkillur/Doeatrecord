import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import {getMe} from "../../_common/utils";

const CREATE_USER = gql`
  mutation CreateUser($userId: String!, $nickname: String!, $thumbnail: String!) {
    createUser(userId: $userId, nickname: $nickname, thumbnail: $thumbnail)
  }
`;

const Register = ({history}) => {
  
  const {myId, myName, thumbnail} = getMe();
  const [createUser] = useMutation(CREATE_USER);
  
  useEffect(() => {
    createUser({variables: {userId: myId, nickname: myName, thumbnail}})
      .then(({data: {createUser}}) => createUser && history.push('/main/search'))
      .catch(err => {
        console.error(`Create User Info Error!!!  ${JSON.stringify(err)}`);
        alert('계정 정보를 저장하는데 문제가 있어요 ㅜㅜ');
        history.push('/login');
      });
  }, [myId]);
  
  return (
    <main style={{marginTop: "50px"}}>
      <ClipLoader size={50} color="white"/>
    </main>
  );
};

export default Register;