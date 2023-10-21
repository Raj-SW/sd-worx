import React from "react";
import "./Tabs.css";
import Lottie from "lottie-react";
import userProfileLottie from "../assets/img/userProfileLottie.json";
import selectCarPooler from "../assets/img/selectCarPooler.json";
import carPoolLottie from "../assets/img/carPoolLottie.json";

export const Tabs = () => {
  return (
    <div className="tab-wrapper">
      <h2>Are you a commuter? </h2>
      <h4>Get Started </h4>

      <div className="tab-containers">
        <div className="tab">
          <Lottie
            animationData={userProfileLottie}
            loop={true}
            className="lottie"
          />
          <span>
            <h3>Join the Community</h3>
          </span>
          <span>Enter your pick up or drop off location and your roaster</span>
        </div>

        <div className="tab">
          <Lottie
            animationData={selectCarPooler}
            loop={true}
            className="lottie"
          />
          <span>
            <h3>Select your Carpooler</h3>
          </span>
          <span>
            Our AI will provide available carpoolers in your area or select one
            of your preference{" "}
          </span>
        </div>

        <div className="tab">
          <Lottie
            animationData={carPoolLottie}
            loop={true}
            className="lottie"
          />
          <span>
            <h4>Enjoy your Ride</h4>
          </span>
          <span>
            Settle your carpooler payments seemlessly and make sure to update
            yur roaster
          </span>
        </div>
      </div>
    </div>
  );
};
