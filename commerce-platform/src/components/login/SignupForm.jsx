import React, {useState} from 'react';
import "../../assets/css/auth-form.scss"
import {useNavigate} from "react-router-dom";
import {register} from "../../services/authService.js";
import {
    isNotEmpty,
    isValidEmail,
    lengthBetween,
    noSpecialChars,
    startsWithLetter,
    validateInput
} from "../../tools/FieldValidator.js";

function SignupForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState({})

    function signup() {
        const messages = validateInputs()
        const user = {
            username: username,
            email: email,
            password: password
        }
        if (Object.keys(messages).length === 0) {
            register(user).then(() => {
                console.log("Signed up successfully")
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function validateInputs() {
        const usernameRules = [isNotEmpty, startsWithLetter, noSpecialChars, lengthBetween(3, 16)];
        const emailRules = [isNotEmpty, isValidEmail];
        const passwordRules = [isNotEmpty, lengthBetween(5, 20)];

        const messages = {
            username: validateInput(username, usernameRules, "Username"),
            email: validateInput(email, emailRules, "Email"),
            password: validateInput(password, passwordRules, "Password"),
            confirmedPassword: password === confirmedPassword ? null : "Passwords are not matching"
        }

        // Filter out fields with no errors (null)
        const filteredMessages = Object.fromEntries(
            Object.entries(messages).filter(([key, value]) => value !== null)
        );
        // Update errors state
        setErrors(filteredMessages);

        return filteredMessages;
    }

    return (
        <div className="auth-page-background">
            <div style={{width: "50%", margin: "auto", paddingBottom: "50px"}}>
                <div className="row">
                    <div className="col-lg-6 order-2 order-lg-1 p-0">
                        <div className="form-container">
                            <div className="form">
                                <h1>Sign Up</h1>
                                <input type="text" value={username} placeholder="Username"
                                       onChange={(e) => setUsername(e.target.value)}/>
                                <span className="error">{errors.username}</span>
                                <input type="email" value={email} placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <span className="error">{errors.email}</span>
                                <input type="password" value={password} placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <span className="error">{errors.password}</span>
                                <input type="password" value={confirmedPassword} placeholder="Confirm password"
                                       onChange={(e) => setConfirmedPassword(e.target.value)}/>
                                <span className="error">{errors.confirmedPassword}</span>
                                <span>or continue with</span>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                                <a href="" onClick={() => navigate('/login')}>Already have an account?</a>
                                <button onClick={signup}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 p-0">
                        <div className="overlay">
                            <div className="container">
                                <div className="overlay-image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;