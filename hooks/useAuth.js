
"use client";

import CONSTANTS from "../data/constants";
import  {deleteCookie}  from "cookies-next";



const useAuth = () => {
const signup = ({ email, password, name }, callback) => {

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
    if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
        console.log('inside-hook1:', response)
        if (callback) {
            callback(response);
        }
    }
})
.catch(() => {});
};


const signin = ({ email, password }, callback) => {
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
      if (response.status === CONSTANTS.RESPONSE_STATUS.OK) 
       if (callback) { callback(); }
    }) 
     .catch((error) => { console.log(error);
    });
    };
    
    const signout = () => {
        deleteCookie("next-jwt");
        };
        

return {
    signup, signin, signout,
};
}
export default useAuth;
