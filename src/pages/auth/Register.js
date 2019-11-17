import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import {getMe} from "../../_common/utils";

const CREATE_USER = gql`
  mutation CreateUser($userId: String!, $nickname: String!) {
    createUser(userId: $userId, nickname: $nickname)
  }
`;

const Register = ({history}) => {
  
  const {myId, myName} = getMe();
  const [createUser] = useMutation(CREATE_USER);
  
  useEffect(() => {
    createUser({variables: {userId: myId, nickname: myName}})
      .then(({data: {createUser}}) => createUser && history.push('/main/search'))
      .catch(err => {
        console.error(`Create User Info Error!!!  ${JSON.stringify(err)}`);
        toast.error('계정 정보를 저장하는데 문제가 있습니다.');
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