import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styling/loginAndSignup.scss';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        const passwordSetup = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordSetup.test(password)) {
            setError('Password must be at least 6 characters long and contains both letters, numbers and special characters.');
            return;
        }

        try {
            const url = 'http://localhost:5000/server/Signup';

            const data = { username, password, email, firstname, lastname };

            const response = await axios.post(url, data);

            console.log(response.data.message);
            navigate('/Login');
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                setError('Failed to sign up. Please try again.');
            } else {
                console.error('Error', error.message);
                setError('Failed to sign up. Please try again.');
            }
        }
    };

    return (
        <div className="login-signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="input-container">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/Login">Login</Link></p>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SignupPage;