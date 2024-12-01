import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  const loginbtn = () => {
    navigate("/login");
  }

  const signupbtn = () => {
    navigate("signup");
  }

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center mb-4">
        <h1 className="display-4">Employee List</h1>
        <p className="text-muted">Welcome to the Employee Dashboard! Choose an option to proceed.</p>
      </div>
      <div className="d-flex gap-3">
        <Button
          variant="contained"
          color="primary"
          onClick={loginbtn}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={signupbtn}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
