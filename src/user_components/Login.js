import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient/apiClient';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { AuthContext } from "../authentication/AuthContext";


export const Login = () => {

    // Dynamically updates the state based on input fields
    const [username, setUsername] = useState("");  // this initial the value to empty at first and to update the value we call the other function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(""); // To display success/error messages
    const { login } = useContext(AuthContext); // Access login function from AuthContext




    const navigate = useNavigate(); // create a object for navigation

    
    const handleInput = (e) => {
        const { name, value } = e.target; // Get field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };
      


   // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    setMessage(""); // Clear previous messages

    try {
      const response = await apiClient.post("/api/v1/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful!");

        login(response.data.token); // Update state and store token

        // Store the token for authentication persistence
        // localStorage.setItem("token", response.data.token);

        // Navigate to the protected route after successful login after 2 seconds
        setTimeout(() => {
          setSubmitted(true);
          navigate("/employeelist");
        }, 1000)
      }
    } catch (error) {
      // Handle errors from API response
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Display backend error message
      } else {
        setMessage("An error occurred while logging in.");
      }
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={username}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              value={email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              value={password}
              onChange={handleInput}
              required
            />
          </div>
          <div className="text-center">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </div>
        </form>

        {message && (
          <div className="mt-3">
            <Alert severity={message === "Login successful!" ? "success" : "error"}>{message}</Alert>
          </div>
        )}

        {submitted && (
          <Alert severity="success" className="mt-3">
            Form Submitted Successfully!
          </Alert>
        )}

        <p className="text-center mt-3">
          Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
}
