import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page or desired route
  };

  return (
    <Box
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
      style={{
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h1" style={{ fontSize: '6rem', fontWeight: 'bold' }}>
        404
      </Typography>
      
      <Typography variant="h5" className="mb-3 text-muted">
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" className="mb-4">
        Please check the URL or go back to the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoHome}
      >
        Go Home
      </Button>
    </Box>
  );
};
