import React from "react";
import { Carousel } from "react-bootstrap";

const Homepage = () => {
  return (
    <div>
      <h1 className="text-center">Welcome </h1>
      <img
        className="center"
        src="/src/assets/Repair_or_Replace_logo.png"
        alt="Repair or Replace Company Logo"
      />
      <h3 className="text-center">
        Are your appliance(s) acting up or no longer working? Don't know if it
        needs a fix or a replacement? With Repair or Replace, you can track
        repairs, maintenance, and make informed decisions about whether to
        repair or replace a major appliance right here!
      </h3>
      <Carousel>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
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
