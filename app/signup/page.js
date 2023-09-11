
"use client";

import { useRef} from "react";
import useAuth from "../../hooks/useAuth";

export default function SignUpPage() {
const { signup } = useAuth();

const namelnputRef = useRef();
const emaillnputRef = useRef();
const passwordInputRef = useRef();

const handleFormSubmission = (event) => {

    event.preventDefault();

    const name = namelnputRef.current.value;
    const email = emaillnputRef.current.value;

    const password = passwordInputRef.current.value;

    signup({ email, password, name }, (response) => {
        alert(response.data);
    });
}

return (
    <>
    <h1>Create New Account</h1>
    <form onSubmit={handleFormSubmission}>
        <div className="row">
            <div className="col-label">
            <label htmlFor="name">Name </label>
            </div>
            <div className="col-input">
            <input type="text" id="name" ref={namelnputRef} />
            </div>
        </div>
        <div className="row">
            <div className="col-label">
            <label htmlFor="email">Email </label>
            </div>
            <div className="col-input">
            <input type="email" id="email" ref={emaillnputRef} />
            </div>
        </div>

        <div className="row">
            <div className="col-label">
            <label htmlFor="password">Password </label>
            </div>
            <div className="col-input">
            <input type="password" id="password" ref={passwordInputRef} />
            </div>
        </div>
        <input type="submit" value="Sign Up" />
    </form>
    </>
);
} 
