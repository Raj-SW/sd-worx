import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import carAnimation from "../assets/img/lottie2.json";

import "./Community.css";

export const Community = () => {
  return (
    <div className="Community">
      <h2>Are you a Driver?</h2>
      <h4>Help You and Others</h4>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className="reasons">
              <div>
                <span className="stroke-text-normal-orange">Share</span>
                <span className="text-normal-darkGray"> fuel cost</span>
              </div>

              <div>
                <span className="text-normal-darkGray">Get </span>
                <span className="text-normal-scarlet">Rewarded </span>
                <span className="text-normal-darkGray">by SDWorx</span>
              </div>

              <div>
                <span className="text-normal-darkGray">
                  Reduce Parking Needs{" "}
                </span>
                <span className="stroke-text-normal-darkGray">for others</span>
              </div>

              <div>
                <span className="text-normal-darkGray">
                  Foster your workplace{" "}
                </span>
                <span className="text-normal-orange">community</span>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} xl={5}>
            <div className="animated-container">
              <Lottie animationData={carAnimation} loop={true} />
            </div>
          </Col>
        </Row>
        <div className="join-us">
          <button className="vvd">
            <span>Join</span>
          </button>
        </div>
      </Container>
    </div>
  );
};
