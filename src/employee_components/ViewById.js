import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import Button from '@mui/material/Button';



export const ViewById = () => {

    const { id } = useParams(); // Get the ID from the URL
    const [viewEmp, setviewEmp] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeId = async () => {
            try{
                console.log(`Fetching details for employee ID: ${id}`); // Debug log for ID
                const response = await apiClient.get(`/api/v1/emp/employees/${id}`); // Kinda of attach the Url to the path, resulting in view emp by id
                console.log('API Response:', response.data); // Debug log for API response
                console.log(response.status)

                setviewEmp(response.data); // set the state to the response data
                setLoading(false); // Turn off the loading state

            }catch(err){
                setError(err.message);

            }
        } 

        fetchEmployeeId();

    }, [id])

    if (error) {
        return (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert severity="error">{error}</Alert>
          </div>
        );
    }

    if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <CircularProgress />
            <Typography variant="h6" className="ms-3">Loading employee details...</Typography>
          </div>
        );
    }

    if (!viewEmp) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Typography variant="h6">No employee details found.</Typography>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Card className="shadow-lg">
        <CardContent>

          <Typography variant="h4" className="text-center mb-4">
            Employee Details
          </Typography>

          <div className="row">
            <div className="col-md-6">

              <Typography variant="h6">
                <strong>First Name:</strong> {viewEmp.first_name}
              </Typography>
              <Typography variant="h6">
                <strong>Last Name:</strong> {viewEmp.last_name}
              </Typography>
              <Typography variant="h6">
                <strong>Email:</strong> {viewEmp.email}
              </Typography>
              <Typography variant="h6">
                <strong>Department:</strong> {viewEmp.department}
              </Typography>
            </div>

            <div className="col-md-6">
              <Typography variant="h6">
                <strong>Position:</strong> {viewEmp.position}
              </Typography>
              <Typography variant="h6">
                <strong>Salary:</strong> ${viewEmp.salary}
              </Typography>
              <Typography variant="h6">
                <strong>Date of Joining:</strong>{' '}
                {new Date(viewEmp.date_of_joining).toLocaleDateString()}
              </Typography>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Button
              variant="contained"
              color="primary"
              className="me-2"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert('Edit functionality coming soon!')}
            >
              Edit Employee
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
