import React, { useState } from "react";
import "./Forms.css";
import { Container, Row, Col } from "react-bootstrap";
import SparkLogo from "../assets/img/01.png";

export const Forms = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(true);

  const toggleDiv = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  return (
    <div className="forms-wrapper">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7} className="left">
            <div className="left-wrapper">
              <img src={SparkLogo} alt="" srcset="" />
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
                  <div className="div1 ">
                    {/* form Sign in */}
                    <form>
                      <h3>Sign in</h3>
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
                      <div className="remember-me-wrapper">
                        <input
                          type="checkbox"
                          name="remember"
                          id=""
                          className="remember-me"
                        />
                        <label htmlFor="check" className="">
                          Remember Me
                        </label>
                      </div>

                      <div className="signin-btn">
                        <button className="vvd">Sign In</button>
                      </div>
                      <p>
                        Forgot<a href="">Password?</a>{" "}
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
