import React from 'react';
import architecture1 from '../../images/architecture4.jpg'
import civil_engineering from '../../images/civil_engineering.jpg'
import mechanical from '../../images/mechanical.jpg'
import accountants from '../../images/accountants.jpg'
import ict_support from '../../images/ict_support.jpg'

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
                                    <p><a href="#details">We excel in building designs and supervision from professionals</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">Contact Us</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={civil_engineering} alt="Second slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Civil Engineering</h4>
                                    {/* <p><a href="#details">Management of Civil Engineering Construction, Building Design and Supervision, Topographic Surveying and Design, Transportation Planning and Feasibility Study and so on ...</a></p> */}
                                    <p><a href="#details">In search of incredible engineering solutions? </a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">Contact Us</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={mechanical} alt="Fifth slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Mechanical Engineering</h4>
                                    <p><a href="#details">We have excellent services related to hydraulic and structural engineering design for you.</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">Contact Us</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={accountants} alt="Seventh slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>Accounting, Business, Bookkeeping & Consultancy</h4>
                                    <p><a href="#details">Accounting, bookkeeping and auditing activities, tax consultancy & Business Development, Management and Market research and public opinion polling consultancy</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">Contact Us</a>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={ict_support} alt="Seventh slide" />
                                <div className="carousel-caption d-md-block">
                                    <h4>ICT Support, Software Development Services and Consultancy</h4>
                                    <p><a href="#details">Want to put your business online? We evengelize the power of advanced technology!</a></p>
                                    <a href="/contact" className="btn mt-lg-4 contact-button">Contact Us</a>
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
