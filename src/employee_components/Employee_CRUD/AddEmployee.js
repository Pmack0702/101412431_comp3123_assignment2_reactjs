import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
  Alert,
  Box,
} from '@mui/material';
import apiClient from '../../apiClient/apiClient';


export const AddEmployee = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState('Employee'); 
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const positions = ['HR', 'Manager', 'Employee', 'Intern']; // Predefined options

    const navigate = useNavigate(); // Hook for navigation


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        // setError(null);.

        const employeeData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            position: position,
            salary: salary,
            department: department,
          };

        try {
            // Retrieve the token from local Storage
            const token = localStorage.getItem('token');

            // Axios to make POST Request
            const response = await apiClient.post('/api/v1/emp/employees', employeeData,{
                headers: { Authorization: `Bearer ${token}`},
            })

            console.log("Employee added:", response.data);

            
            // Update the State
            // Here we are setting the state to be empty because once the emp is creating it should empty the state 
            setFirstname("");
            setLastname("");
            setEmail("");
            setPosition("");
            setSalary("");
            setDepartment("");

            setSuccess("Employee added successfully!");

            
        } catch (error) {
            setError(true)
            console.log("Error: ", error.message)
            // setError('Failed to add employee. Please try again.');

        }
    }
  

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
      };

  return (
    <Box className="container py-4">
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h4" className="text-center mb-4">
            Add Employee
          </Typography>

          {success && <Alert severity="success" className="mb-3">{success}</Alert>}
          {error && <Alert severity="error" className="mb-3">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Box className="row g-3">
              <Box className="col-md-6">
                <TextField
                  label="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <FormControl fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    {positions.map((pos) => (
                      <MenuItem key={pos} value={pos}>
                        {pos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <Box className="col-md-6">
                <TextField
                  label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
            </Box>

            <Box className="text-center mt-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="me-2"
              >
                Add Employee
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
