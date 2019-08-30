import React from "react";

const Error = ({message = '없는 페이지 입니다 ㅜㅜ'}) => {
	return (
		<div>{message}</div>
	);
};

export default Error;