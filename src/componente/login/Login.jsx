import React, {useState} from "react";
import './Login.css';
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login=() =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/api/user/login', {
                email,
                password
            });
            if (response.status === 200) {
                localStorage.setItem('user', response.data.data); 
                navigate('/home');
            }
        } catch (err) {
            window.alert(`Error code ${err.response.status}, ${err.response.data.message}`);
        }
    };
    return (
        <div className="login">
           <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <div className="textbox">
                <input type="text" placeholder="Username" onChange={handleEmailChange} required/>
                <FaRegUserCircle className="icon"/>
            </div>

            <div className="textbox">
                <input type="password" placeholder="Password"onChange={handlePasswordChange} required/>
                <FaLock className="icon"/>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox"/>Remember me</label>
                <a href="#">Am uitat parola </a>
            </div>

            <button type="submit">Log in</button>

            <div className="register">
                <p>Creeaza un cont <Link to="./signup">Sign up</Link></p>
            </div>

            </form>
        </div>
    )
}

export default Login;