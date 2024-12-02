import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const loginbtn = () => {
    navigate("/login");
  };

  const signupbtn = () => {
    navigate("/signup");
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg px-4"
        style={{ backgroundColor: '#87CEFA' }} // Light blue background
      >

        <div className="collapse navbar-collapse justify-content-end">
          <button
            className="btn btn-outline-dark mx-2"
            onClick={loginbtn}
          >
            Login
          </button>
          <button
            className="btn btn-light text-dark"
            onClick={signupbtn}
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: '#E3F2FD' }} // Light blue background for the main content
      >
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark">Welcome to Employee Dashboard</h1>
          <p className="text-muted fs-5">Manage your employees with ease using our intuitive interface!</p>
        </div>

        {/* Cards Section */}
        <div className="container mb-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">Add Employees</h5>
                  <p className="card-text text-muted">Easily add new employees to the system with detailed information.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">View Records</h5>
                  <p className="card-text text-muted">Quickly view all employee records and manage their details.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">Update Information</h5>
                  <p className="card-text text-muted">Modify employee details with our user-friendly interface.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      <footer
        className="text-light py-3 mt-5"
        style={{ backgroundColor: '#87CEFA' }} // Light blue footer
      >
        <div className="container text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Employee Dashboard. All Rights Reserved.
          </p>
          <small>Powered by ReactJS and Bootstrap</small>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
