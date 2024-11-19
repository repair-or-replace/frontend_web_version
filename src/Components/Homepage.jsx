import React from "react";
import { Carousel } from "react-bootstrap";
import repairLogo from '../assets/Repair_or_Replace_logo.png';
import refrigeratorImage from '../assets/Refrigerator.jpg';
import wrenchImage from '../assets/wrench.jpg';

const Homepage = () => {
  return (
    <div>
      <h1 className="text-center">Welcome </h1>
      <img
        className="center"
        src={repairLogo}
        alt="Repair or Replace Company Logo"
      />
      <h3 className="text-center">
        Are your appliance(s) acting up or no longer working? Don't know if it
        needs a fix or a replacement? With Repair or Replace, you can track
        repairs, maintenance, and make informed decisions about whether to
        repair or replace a major appliance right here!
      </h3>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={refrigeratorImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wrenchImage}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wrenchImage}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Homepage;
