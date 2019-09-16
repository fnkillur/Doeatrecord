import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import {getMe} from "../../_common/utils";

const CREATE_USER = gql`
  mutation CreateUser($userId: String!, $nickname: String!, $thumbnail: String!) {
    createUser(userId: $userId, nickname: $nickname, thumbnail: $thumbnail) {
      userId
      coupleId
    }
  }
`;

const Register = ({history}) => {
  
  const {userId, nickname, thumbnail_image} = getMe();
  const [createUser] = useMutation(CREATE_USER);
  
  useEffect(() => {
    createUser({variables: {userId, nickname, thumbnail: thumbnail_image}})
      .then(({data: {createUser}}) => createUser && history.push('/main/search'))
      .catch(err => {
        console.error(`Create User Info Error!!!  ${JSON.stringify(err)}`);
        alert('계정 정보를 저장하는데 문제가 있어요 ㅜㅜ');
        history.push('/login');
      });
  }, [userId]);
  
  return (
    <main style={{marginTop: "50px"}}>
      <ClipLoader size={50} color="white"/>
    </main>
  );
};

export default Register;