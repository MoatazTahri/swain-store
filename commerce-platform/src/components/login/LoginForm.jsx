import React, {useState} from 'react';
import "../../assets/css/auth-form.scss"
import {authenticate} from "../../services/authService.js";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"

function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const previousPath = location.state?.lastPath || '/store' // Set the page to go after login.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login(e) {
        e.preventDefault()
        authenticate(email, password).then(response => {
            const token = response.data.token;
            Cookies.set("token", token, {
                expires: 7, // expires in 7 days.
                secure: false, // warning! only for developing.
                sameSite: "strict"
                }
            )
            alert("login successful!")
            navigate(previousPath)
            window.location.reload()
        }).catch(error => {
            if (error.response.status === 401) {
                alert("Bad Credentials")
            }
            else alert("Login failed!")
        })
    }

    return (
        <div className="auth-page-background">
            <div style={{width: "50%", margin: "auto", paddingBottom: "50px"}}>
                <div className="row">
                    <div className="col-lg-6 order-2 order-lg-1 p-0">
                        <div className="form-container">
                            <div className="form">
                                <h1>Login</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                                <span>or use your account</span>
                                <input type="email" value={email} placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <input type="password" value={password} placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <a href="">Forgot password?</a>
                                <button onClick={login}>Login</button>
                                <a href="" onClick={() => navigate('/register')}>
                                    You don&apos;t have an account? Sign up
                                </a>
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

export default LoginForm;