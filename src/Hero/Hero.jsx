import React from 'react';
import './Hero.css';
import { Container , Row, Col} from "react-bootstrap"
import car from '../assets/img/car.png';

 export const Hero = () => {
  return (
    <div className="Hero">
        <div className="hero-wrapper">
        <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7} className='left'>
                    <div className="hero-text">
                            <div>
                                <span className='stroke-text-normal-darkGray'>Search, </span>
                                <span className='stroke-text-normal-scarlet'>Book</span>
                            </div>
                            <div>
                                <span className='text-normal-darkGray'>and </span>
                                <span className='stroke-text-normal-orange'>Carpool </span>
                                <span className='text-normal-darkGray'>easily</span>
                            </div>
                            <div>
                                <span>
                                Hitch hike your nearest carpooler, reduce your traveling burden. Be more organised...
                                </span>
                            </div>
                    </div>
                    </Col>
                    <Col  xs={12} md={6} xl={5} className='right'>
                    <img src={car} alt="Car Img"></img>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  );
}

