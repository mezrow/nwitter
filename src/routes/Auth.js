import { authService, firebaseInstance } from 'fbase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import React, { useState } from "react";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        //console.log(event.target.name);
        const {target: {name, value}} = event;
        
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        // 여기서 좀 헤맸음
        // 강의 영상과 다름.. 위에 세팅도 강의에 있는건데, 안쓴건 안지우고 주석처리함        
        try {
            let data;
            const auth = getAuth(); //이게 있어야 됨
            if(newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log (data);
        } catch(error) {
            //console.log(error);
            setError(error.message);
        }
    };

    // Create Account 와 Sign In 버튼 토글
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        //console.log(event.target.name);
        const { target: {name} } = event;  //es6 문법 - 구조분해할당??

        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider(); 
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required="required"
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required="required"
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}> {newAccount ? "Sign In" : "Ceated Account" }  </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;