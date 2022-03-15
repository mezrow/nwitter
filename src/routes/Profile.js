import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");      //로그아웃 후 홈으로 이동
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};