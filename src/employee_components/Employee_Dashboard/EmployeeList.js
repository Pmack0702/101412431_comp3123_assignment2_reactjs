import 'bootstrap/dist/css/bootstrap.css';
import React, { useContext, useEffect, useState } from 'react';
 import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import apiClient from '../../apiClient/apiClient';  // Import the configured Axios instance
import { AuthContext } from '../../authentication/AuthContext'; // Import AuthContext



export const EmployeeList = () => {

    const [employeelist, setEmployeeList] = useState([]) // to store the employee state
    const [error, setError] = useState(null);  // State for error handling (optional)
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Get logout from AuthContext

    const positions = ['HR', 'Manager', 'Employee', 'Intern']; // Predefined options


    // useEffect hook to fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token'); // assuming 'token' is already stored in localStorage

                // if (!token) {
                //     console.log("No token found. Please log in.");
                //     return;
                // }

                // Axios is used to make HTTP request, it returns promises
                const response = await apiClient.get('/api/v1/emp/employees', { // making a GET request to backend API endpoint to retrieve all the employees data
                    headers: { Authorization: `Bearer ${token}`}, // Authenticating the user with the backend server, (Include the token in the header)
                });

                console.log('API Response:', response.data); // Debug the response
                console.log(response.status);

                setEmployeeList(response.data); // Update the state component 

            } catch(error){
                console.log("Error occured while fetching employees: ", error)
                setError(error.message); // set the error in state
            }
        }

        // Fetch employee data when component mounts
        fetchEmployees();

    }, []); // It runs only once because there is no dependencies specified, (The empty dependency array ensures this runs once after initial render)

    const handleLogout = () => {
      logout(); // Call the logout function from AuthContext
      navigate('/login'); // Redirect to login page
    };

    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmDelete) return; // If the user cancels, do nothing
  
      try {
          const token = localStorage.getItem('token'); // Get the token from localStorage
          const response = await apiClient.delete(`/api/v1/emp/employees/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
          });
  
          console.log('Delete response:', response.data); // Debugging
  
          setEmployeeList(employeelist.filter((employee) => employee._id !== id)); // Update the list
          setSuccess('Employee deleted successfully!'); // Set success alert
  
          // Clear the alert message after 3 seconds
          setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
          console.error('Error deleting employee:', err);
          setError('Failed to delete the employee.'); // Set error alert
          setTimeout(() => setError(null), 3000);
      }
  };
  
    

      // Handle search form submission
    const handleSearch = async (e) => {
    
        e.preventDefault();

        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await apiClient.get(`/api/v1/emp/employee/search?${query}`);
            setEmployeeList(response.data);

        } catch (err) {
                
            console.error('Error searching employees:', err);
            setError('Failed to search employees.');
        }
    };

    const handleRefresh = async () => {
        try {
          // Clear search fields
          setSearchParams({ department: '', position: '' });
      
          // Fetch all employees
          const response = await apiClient.get('/api/v1/emp/employees');
          setEmployeeList(response.data); // Update the table with all employees
        } catch (error) {
          console.error('Error refreshing employee list:', error);
          alert('Failed to refresh employee list.');
        }
      };

      
    // Handle input changes in the search form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddButton = () => {
        navigate('/employees/AddEmployee');
    }

    // Handle a View Action
    const handleView = (id) => {
        // <Route path="/employees/:id" element={<ViewById />} />
        navigate(`/employees/${id}`); // Navigate to View by Id Page
    }
    
    const HandleUpdate = (id) => {
        navigate(`/employees/${id}/UpdateEmployee`)
    }

    return (

        <div className="container py-4">

            
          <h1 className="text-center mb-4 bg-dark text-white py-5">Employee Dashboard</h1>
        

          {success && <Alert severity="success" className="mb-3">{success}</Alert>}
          {error && <Alert severity="error" className="mb-3">{error}</Alert>}

        
          <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="contained" color="primary" onClick={handleAddButton}>
              Add Employee
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>

          <form onSubmit={handleSearch} className="d-flex gap-3 ">
            
            <TextField
              label="Department"
              name="department"
              variant="outlined"
              value={searchParams.department}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Position"
              name="position"
              variant="outlined"
              select
              value={searchParams.position}
              onChange={handleInputChange}
              fullWidth
            >
              {positions.map((pos) => (
                <MenuItem key={pos} value={pos}>
                  {pos}
                </MenuItem>
              ))}
            </TextField>

              <Button type="submit" variant="contained" color="primary" className='px-5'>
                Search
              </Button>
              <Button type="button" variant="outlined" color="secondary" onClick={handleRefresh} className='px-5'>
                Reset
              </Button>
              
          </form>

        </div>
    
          
    
  

          <table className="table table-striped">

            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employeelist.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="contained" color="primary" onClick={() => handleView(employee._id)}>
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => HandleUpdate(employee._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
    );
}
