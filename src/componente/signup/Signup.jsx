import React, {useState} from "react";
import './Signup.css';
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";


const Signup=() =>{

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleUserName = (e) => setUserName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/api/user/createUser', {
                name,
                username,
                email,
                password
            });
            if (response.status === 201) {
                localStorage.setItem('user', response.data.userId);
               navigate('/');
            }
        } catch (err) {
            window.alert(`Error code ${err.response.status}, ${err.response.data.message}`);
        }
    };

    return (
        <div className="signup">
             <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div className="textbox">
                <input type="text" placeholder="Nume" required value={name} onChange={handleNameChange}/>
                <FaRegUserCircle className="icon"/>
            </div>

            <div className="textbox">
                <input type="text" placeholder="Username" required value={username} onChange={handleUserName}/>
                <MdOutlineDriveFileRenameOutline className="icon"/>
            </div>

            <div className="textbox">
                    <input type="text" placeholder="Email" required value={email} onChange={handleEmailChange}/>
                    <FaRegUserCircle className="icon"/>
                </div>

            <div className="textbox">
                <input type="password" placeholder="Password" required value={password} onChange={handlePasswordChange}/>
                <FaLock className="icon"/>
            </div>

            <button type="submit">Sign up</button>

            <div className="back-login">
                <p>Am deja cont <Link to="/">Log in</Link></p>
            </div>

            </form>
        </div>
    )
}

export default Signup;