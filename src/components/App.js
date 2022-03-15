import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
// https://firebase.google.com/docs/auth/web/start?authuser=0&hl=ko 참조
// 현재는 202203 .. 강의 당시와 뭔가 다름 


function App() {   
  //console.log(authService.currentUser);

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // onAuthStateChanged : 접속한 후 상태 가져오기 (로그인, 로그아웃, 가입....등등.)
    authService.onAuthStateChanged( (user) => {  
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
