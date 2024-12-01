import './App.css';
import { Login } from './user_components/Login';
import { Signup } from './user_components/Signup';
import { AuthProvider } from "./authentication/AuthContext";
import { EmployeeList } from './employee_components/Employee_Dashboard/EmployeeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ViewById } from './employee_components/Employee_CRUD/ViewById';
import { AddEmployee } from './employee_components/Employee_CRUD/AddEmployee';
import { UpdateEmployee } from './employee_components/Employee_CRUD/UpdateEmployee';
import ProtectedRoute from './authentication/ProtectedRoute';
import Dashboard from './homepage_components/dashboard';
import { ErrorPage } from './Error/ErrorPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/employeelist"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <ProtectedRoute>
                <ViewById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/AddEmployee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id/UpdateEmployee"
            element={
              <ProtectedRoute>
                <UpdateEmployee />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
