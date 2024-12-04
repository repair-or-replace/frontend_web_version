import React from "react";
import { Carousel } from "react-bootstrap";
import refrigeratorImage from "../assets/Refrigerator.jpg";
import './styles.css'
import wrenchImage from "../assets/wrench.jpg";
import RorR from "../assets/Repair_or_Replace_square.png";

const Homepage = () => {
  const user = JSON.parse(localStorage.getItem('username'))

  return (
    <div>
      <h1 className="text-center">Welcome {user}! </h1>
      <center>
        <img
          className="center"
          src="/src/assets/Repair_or_Replace_logo.png"
          width={300}
          alt="Repair or Replace Company Logo"
        />
      </center>

      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={refrigeratorImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="text-white">
              Are your appliance(s) acting up or no longer working?
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wrenchImage}
            alt="hand holding a wrench"
          />
          <Carousel.Caption>
            <h3 className="text-white">
              Don't know if it needs a fix or a replacement?
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={RorR}
            alt="Repair_or_Replace_logo"
          />
          <Carousel.Caption className=".carousel-caption">
            <h3>
              With Repair or Replace, you can track repairs, maintenance, and
              make informed decisions about your
              appliance(s) right here!
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Homepage;
