import React, { Component } from 'react';
import Slider from 'react-slick';

import './style.scss';


class Carousel extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  }
  render() {
    return (
      <div className="homepage">
      <Slider {...this.settings}>
        <div><img src="http://lorempixel.com/940/375/fashion/" alt="Mamas & Papas"/></div>
        <div><img src="http://lorempixel.com/940/375/fashion/" alt="Mamas & Papas"/></div>
        <div><img src="http://lorempixel.com/940/375/fashion/" alt="Mamas & Papas"/></div>
        <div><img src="http://lorempixel.com/940/375/fashion/" alt="Mamas & Papas"/></div>
        <div><img src="http://lorempixel.com/940/375/fashion/" alt="Mamas & Papas"/></div>
      </Slider>
      </div>
    );
  }
}

export default Carousel;
