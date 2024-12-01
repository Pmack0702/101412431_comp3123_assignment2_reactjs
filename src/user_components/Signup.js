import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import apiClient from '../apiClient/apiClient';

export const Signup = () => {

    // we use onchange event to updates the respective states whenever the user types in the input fields
    // the state hold the value which in turn makes easier for us to update and retreive values
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false); // Tracks form submission status

    const navigate = useNavigate();

    // Easier method because this after validating the name from the input the will automatically updates the respective state

    const handleInput = (e) => {
        const { name, value } = e.target; // Get or Destructure field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh
        console.log("Form Data: ", { username, email, password });

        const signup = {
          username: username,
          email: email,
          password: password
        }

        try {

          const token = localStorage.getItem('token');

          const response = await apiClient.post('/api/v1/user/signup', signup, {
            headers: { Authorization: `Bearer ${token}`},
          })
          console.log(response.data)

          setSubmitted(true);

          // Reset form fields
          setUsername("")
          setEmail("")
          setPassword("")
          
        } catch (error) {
          console.log("Error: ", error.message)
          
        }

        // Redirect to login page after successful signup
        setTimeout(() => {
            navigate('/');
        }, 2000);


    }


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "500px"}}>
        
        <div className="card shadow-lg p-4">

        <h2 className="text-center text-primary mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>

            {/* Username Field */}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                name="username"
                onChange={handleInput}
                className="mb-3"
                required
              />

            {/* Email Field */}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                name="email"
                onChange={handleInput}
                className="mb-3"
                type="email"
                required
              />

            {/* Password Field */}
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                name="password"
                onChange={handleInput}
                className="mb-3"
                type="password"
                required
              />

            {/* Submit Button */}
            <Button
                variant="contained"
                type="submit"
                fullWidth
                className="mb-3"
                style={{ backgroundColor: '#1976d2' }}
              >
                Sign Up
              </Button>

        </form>

        {submitted && <p className="mt-3 text-success">Sign Up Successful! Redirecting to login...</p>}

        <p className="mt-3">
            Already Have an account? <a href='/login' className="text-primary">Login</a>
        </p>

        </div>
    </div>
  )
}
