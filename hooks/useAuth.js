
"use client";

import { useContext } from "react";
import { AuthenticationContext } from "../app/context/auth-context";
import CONSTANTS from "../data/constants";

import { deleteCookie } from "cookies-next";

const useAuth = () => {

const {setAuthState} = useContext(AuthenticationContext);

const signup = ({ email, password, name }, callback) => {

    setAuthState({user:null, error:null, loading: true});

    const reqBody = {
    email,
    password,
    name,
    };

fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
    "Content-Type": "application/json",
    },

})
.then((data) => data.json())
.then((response) => {
    console.log('inside-hook1:', response)
    setAuthState({user:response.data.user, error:null, loading: false})
    if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
        console.log('inside-hook1:', response)
        if (callback) {
            callback(response);
        }
    } else {
        setAuthState({user:null, error:response.data, loading: false})
    }
})
.catch(() => {
    setAuthState({user:null, error:"Internal Server Error", loading: false})
});
};


const signin = ({ email, password }, callback) => {
    setAuthState({user:null, error:null, loading: true});
    const reqBody = {
    email,
    password,
    };
    
    fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
        "Content-Type": "application/json", } 
    })
    .then((data) => data.json()) 
    .then((response) => { 
      console.log(response); 
      setAuthState({user:response.data.user, error:null, loading: false})
      if (response.status === CONSTANTS.RESPONSE_STATUS.OK) 
       if (callback) { callback(); }
      else {
        setAuthState({user:null, error:response.data, loading: false})
      }
    }) 
     .catch((error) => { 
        console.log(error);
        setAuthState({user:null, error:"Internal Server Error", loading: false})
    });
    };

    const signout = () => {
        deleteCookie("next-jwt");
        setAuthState({user:null, error:null, loading: true});
    };
        

return {
    signup, signin, signout
};
}
export default useAuth;
