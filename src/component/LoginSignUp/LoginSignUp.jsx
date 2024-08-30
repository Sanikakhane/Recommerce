import React, { useEffect, useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';

const LoginSignUp = () => {
    const toggleSignup = () => {
        document.querySelector('.cont').classList.toggle('s--signup');
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/getusers");
                console.log(response.data); // Check the structure of the response
                const userArray = response.data.data // Ensure it's an array
                setUsers(userArray);
                console.log(userArray)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const register = () => {
        if (!username || !password || !email) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert("Username already exists. Please choose a different username.");
            return;
        }

        const requestBody = {
            username: username,
            password: password,
            email: email
        };

        fetch('http://localhost:8000/api/v1/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("User registered successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred while registering the user.");
        });
    };

    return (
        <div className="cont">
            <div className="form sign-in">
                <h2>Welcome</h2>
                <label>
                    <span>Email</span>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <p className="forgot-pass">Forgot password?</p>
                <button type="button" className="submit">Sign In</button>
            </div>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h3>Don't have an account? Please Sign up!</h3>
                    </div>
                    <div className="img__text m--in">
                        <h3>If you already have an account, just sign in.</h3>
                    </div>
                    <div className="img__btn" onClick={toggleSignup}>
                        <span className="m--up">Sign Up</span>
                        <span className="m--in">Sign In</span>
                    </div>
                </div>
                <div className="form sign-up">
                    <h2>Create your Account</h2>
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={register}
                        className="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignUp;
