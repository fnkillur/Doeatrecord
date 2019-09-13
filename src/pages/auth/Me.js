import React from "react";
import Emoji from "react-emoji-render";
import {getMe} from "../../_common/utils";

const Me = () => {
	
	const {nickname} = getMe();
	
	return (
		<main>
			{nickname}님, 환영합니다.<Emoji text=":bow:"/><br/><br/><br/>
			이 페이지에는 나중에<br/><br/>
			커플<Emoji text=":woman-heart-man:"/> 지정 및 친구<Emoji text=":man-man-boy-boy:"/> 팔로우 기능이 생길 예정입니다.
		</main>
	);
};

export default Me;