import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import apiClient from '../../apiClient/apiClient';

export const UpdateEmployee = () => {
    // Fetch the id from the URL
    const {id} = useParams(); // Get the employee Id from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [updateEmployee, setUpdateEmployee] = useState(null)
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null);

    // Fetch the employee details on component mount   
    useEffect(() => {

        const fetchEmployee = async () => {

            try {

                const response = await apiClient.get(`/api/v1/emp/employees/${id}`);

                setUpdateEmployee(response.data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching employee:', error);
                setError(error.response?.data?.message || 'Failed to load employee details.');
                setLoading(false); // Turn off loading on error
            }

        }

        fetchEmployee();


    }, [id]); // Everytime when the id changes or configure it will run again

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await apiClient.put(`/api/v1/emp/employees/${id}`, updateEmployee,{
                headers: { Authorization: `Bearer ${token}` },
            })
            alert('Employee updated successfully!');
            navigate("/employeelist") //After updating redirect to the employee list

        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee. Please try again.');
            
        }
    }


    // Hnadle the Input
    const handleChange = (e) => {
        // Get Destruct the name and value from e.target
        const { name, value } = e.target; // so, it will get the name and value(Inputed by user)

        // this function basically means 
        // SETUPDATEEMPLOYEE function updates the state if update employee object
        // Prev: refer to the previos state, ie the state before the change
        // the spread operator ..prev copies the state from previous state into the new object, which is name: value
        // name: value dynamically updates and the value is automatically assigned to it
        setUpdateEmployee((prev) => ({ ...prev, [name]: value }));

    };


      
      if (loading) {
        return (
          <Box className="d-flex justify-content-center align-items-center vh-100">
            <CircularProgress />
            <Typography variant="h6" className="ms-3">
              Loading employee details...
            </Typography>
          </Box>
        );
      }
    
      if (error) {
        return (
          <Box className="d-flex justify-content-center align-items-center vh-100">
            <Alert severity="error">{error}</Alert>
          </Box>
        );
      }
    
      if (!updateEmployee) {
        return (
          <Box className="d-flex justify-content-center align-items-center vh-100">
            <Typography variant="h6">No employee data available.</Typography>
          </Box>
        );
      }

  return (
    <Box className="container py-4">
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h4" className="text-center mb-4">
            Update Employee
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="row g-3">
              <Box className="col-md-6">
                <TextField
                  label="First Name"
                  name="first_name"
                  value={updateEmployee.first_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Last Name"
                  name="last_name"
                  value={updateEmployee.last_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={updateEmployee.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Position"
                  name="position"
                  value={updateEmployee.position}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Salary"
                  name="salary"
                  type="number"
                  value={updateEmployee.salary}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Department"
                  name="department"
                  value={updateEmployee.department}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <Box className="text-center mt-4">
              <Button variant="contained" color="primary" type="submit" className="me-2">
                Update Employee
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/employeelist')}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
