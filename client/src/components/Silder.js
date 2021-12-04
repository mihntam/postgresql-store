import React from "react";

import { withStyles } from "@material-ui/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

const CarouselStyle = {
  imgCarousel: {
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1),rgba(0,0,0,0))",
  },
};

function xyz({ classes }) {
  const { imgCarousel } = classes;

  const valClassImage = `d-block w-100 ${imgCarousel}`;

  return (
    <Carousel prevLabel="" nextLabel="" controls={false}>
      <Carousel.Item>
        <img
          className={valClassImage}
          src="https://salt.tikicdn.com/cache/w1080/ts/banner/89/b7/d7/c3b63c12752f703f2794101010bffa65.png.webp"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={valClassImage}
          src="https://salt.tikicdn.com/cache/w1080/ts/banner/f3/41/08/6512ecb38aec157896851dab82c90ada.png.webp"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={valClassImage}
          src="https://salt.tikicdn.com/cache/w1080/ts/banner/34/e1/84/180b5f94a9fcbcd75f0b14bf2e356750.png.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default withStyles(CarouselStyle)(xyz);
