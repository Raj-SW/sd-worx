import React, { useState } from "react";
import "./Forms.css";
import { Container, Row, Col } from "react-bootstrap";
import SparkLogo from "../assets/img/01.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Forms = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  // Reset error messages
  setEmailError('');
  setPasswordError('');

  // Check for empty fields
  if (!email) {
    setEmailError('Email is required.');
  }

  if (!password) {
    setPasswordError('Password is required.');
  }

  if (!email || !password) {

  }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        auth: {
          app_token: "P14GBkNbwq0sSg7sIDKymbF8gveYreT28p9xq23GQ1it66vgaxLytW4LxnR5Ohvn64qGPTprS7U6XzrLOpSyko3ltJ1426uJMVx9zCb6Uj9J1NEPuva4oKfLJxiUt9Poej8CLtTCh1E0o81izWt42"
      },
      data: {
          email: email,
          password: password
      }
      });

      if (response.status == 200) {
        localStorage.setItem('token', response.data.data.login_token
          );
          window.location.href = '/car-pooling';
      } else {

      }
      
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const toggleDiv = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  return (
    <div className="forms-wrapper">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7} className="left">
            <div className="left-wrapper">
              <img src={SparkLogo} alt=""/>
            </div>
          </Col>
          <Col xs={12} md={6} xl={5} className="right">
            <div className={"right-wrapper "}>
              <div
                className={`form-container toggle-div ${
                  showFirstDiv ? "show-div2" : "show-div1"
                }`}
              >
                {showFirstDiv ? (
                <div className="div1">
                <form onSubmit={handleSubmit}>
                  <h3>Sign in</h3>
                  <div className="email-container">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                  </div>

                  <div className="password-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                  </div>
                  <div className="remember-me-wrapper">
                    <input
                      type="checkbox"
                      name="remember"
                      className="remember-me"
                    />
                    <label htmlFor="check" className="">
                      Remember Me
                    </label>
                  </div>
          
                  <div className="signin-btn">
                    <button className="vvd" type="submit">Sign In</button>
                  </div>
                  <p>
                    Forgot<a href="">Password?</a>
                    <span>or</span>
                    <span className="toggle" onClick={toggleDiv}> Sign Up</span>
                  </p>
                </form>
              </div>
                ) : (
                  <div className="div2">
                    {/* Sign Up form */}
                    <form>
                      <h3>Sign Up</h3>
                      <div className="name-container">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          name="name-input"
                          id=""
                          className=""
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="email-container">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email-input"
                          id=""
                          className=""
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="password-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="email-input"
                          id=""
                          className=""
                          placeholder="Enter Password"
                        />
                      </div>
                      <div className="password-wrapper">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input
                          type="password"
                          name="email-input"
                          id=""
                          className=""
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="signin-btn">
                        <button className="vvd">Sign Up</button>
                      </div>
                      <p>
                        Already have an account?
                        <span className="toggle" onClick={toggleDiv}>
                          {" "}
                          Sign In
                        </span>
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Forms;
