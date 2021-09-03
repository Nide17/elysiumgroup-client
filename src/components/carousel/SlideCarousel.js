import React from 'react';

import architecture1 from '../../images/architecture4.jpg'
import construction from '../../images/construction.jpg'
import road from '../../images/road.jpg'
import site from '../../images/site.jpg'
import electrical from '../../images/electrical.jpg'
import water from '../../images/water.jpg'
import accountants from '../../images/accountants.jpg'
import web4 from '../../images/web4.jpg'

const SlideCarousel = () => {

    return (
        <section className="carousel-section mb-2">
            <div className="carousel-container">
                <div className="row">

                    <div id="carouselIndicators" className="carousel slide" data-ride="carousel">

                        <ol className="carousel-indicators">
                            <li data-target="#carouselIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselIndicators" data-slide-to="3"></li>
                            <li data-target="#carouselIndicators" data-slide-to="4"></li>
                            <li data-target="#carouselIndicators" data-slide-to="5"></li>
                            <li data-target="#carouselIndicators" data-slide-to="6"></li>
                        </ol>

                        <div className="carousel-inner">

                            <div className="carousel-item active">
                                <img className="d-block w-100 h-100" src={architecture1} alt="First slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Architecture & Design</h4>
                                    <p><a href="#details">Beautiful designs from professionals</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={construction} alt="Second slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Building & Construction</h4>
                                    <p><a href="#details">Our engineers deliver excellent construction services</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={road} alt="Third slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Roads & Railway Activities</h4>
                                    <p><a href="#details">Need a road or Railway? CONTACT US.</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={site} alt="Fourth slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Site Preparation Activities</h4>
                                    <p><a href="#details">If you want to prepare your site, the solution is here.</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={electrical} alt="Fifth slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Electrical & Power Activities</h4>
                                    <p><a href="#details">We have excellent services related to the power and electrical engineering</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={water} alt="Sixth slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Water & Plumbing Activities</h4>
                                    <p><a href="#details">Award winning plumber and water engineers of us are waiting for you</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={accountants} alt="Seventh slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Accounting & Consultancy</h4>
                                    <p><a href="#details">Why can't you work with our accountants and tax advisers?</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={web4} alt="Seventh slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Web Development Services</h4>
                                    <p><a href="#details">Want to put your business online? Welcome, we want to help you!</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">CONTACT US</a>
                                </div>
                            </div>

                        </div>

                        <a className="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>

                        <a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>

                    </div>


                </div>
            </div>
        </section>
    );
}

export default SlideCarousel;
