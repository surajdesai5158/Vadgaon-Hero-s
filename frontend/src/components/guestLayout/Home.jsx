import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* Inline responsive styles */}
      <style>
        {`
          .home-carousel-img {
            width: 100%;
            height: 45vh;
            object-fit: cover;
          }

          @media (min-width: 768px) {
            .home-carousel-img {
              height: 65vh;
            }
          }

          @media (min-width: 992px) {
            .home-carousel-img {
              height: 90vh;
            }
          }

          .home-caption {
            text-align: center;
          }
        `}
      </style>

      <Container fluid className="p-0">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={2500}
          fade
        >
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              className="d-block img-fluid home-carousel-img"
              src="/vdagav1.jpeg"
              alt="Vadgaon View"
            />
            <Carousel.Caption className="home-caption">
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <img
              className="d-block img-fluid home-carousel-img"
              src="/boys.jpeg"
              alt="Village People"
            />
            <Carousel.Caption className="home-caption">
            </Carousel.Caption>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <img
              className="d-block img-fluid home-carousel-img"
              src="/Vdgav3.jpeg"
              alt="Village Festival"
            />
            <Carousel.Caption className="home-caption">
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default Home;