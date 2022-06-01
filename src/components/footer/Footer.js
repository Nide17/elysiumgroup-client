import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MapContainer from './MapContainer '
import Social from './Social'

import { useEffect } from "react";

// REDUX
import { connect } from "react-redux"
import { setFooterIcons } from '../../redux/footer/footer.actions'

const Footer = (props) => {

    useEffect(() => {
        // Inside this callback function we perform our side effects.
        props.setFooterIcons()
    });

    const location = useLocation()
    
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password') 
    
    { return null }
    else {

        return (

            <footer className="footer">
                <div className="footer-container px-2 py-4 p-lg-4">

                    <div className="row footer-menu">
                        <div className="col-12 col-sm-6 col-xl-2" id="reach-us">

                            <h4 className="text-center">Get in touch</h4>
                            <ul className="social-buttons d-lg-flex justify-content-center mt-lg-4">

                                {props.iconsData.map((icon) => {
                                    return (
                                        <Social icon={icon} key={icon.id} />
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-2 p-1 contacts d-flex justify-content-center d-lg-block">
                            <h4 className="d-none d-lg-block">Contacts</h4>
                            <ul>
                                <li><i className="fa fa-phone fa-lg"></i>&nbsp;(+250)788623823</li>
                                <li><i className="fa fa-envelope fa-md"></i>&nbsp;<small>elysiumgroupltd19@gmail.com</small></li>
                                <li><i className="fa fa-map-marker"></i>&nbsp;<small>KK 40 St, Kigali</small></li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-5 p-1 map">
                            <MapContainer />
                        </div>

                        <div className="col-7 col-sm-3 col-xl-2 mt-3 mt-lg-0">
                            <h4>Business Hours</h4>
                            <ul className="list-unstyled d-flex flex-column justify-content-end">
                                <li><Link to="/#">Monday - Friday : 8am - 5pm</Link></li>
                                <li><Link to="/#">Saturday : 8am - 1pm</Link></li>
                                <li><Link to="/#">Sunday : Closed</Link></li>
                            </ul>
                        </div>

                        <div className="col-5 col-sm-3 col-xl-1 mt-3 mt-lg-0">
                            <h4>Explore</h4>
                            <ul className="list-unstyled d-flex flex-column justify-content-start">
                                <li><a href="/#services">Expertise</a></li>
                                <li><a href="/#projects">Portfolio</a></li>
                                <li><a href="/about">About us</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="row copyright">
                    <div className="col-12">
                        <p className="text-center mb-0">
                            <strong>© 2022 Elysium Group Ltd - All Rights Reserved</strong>
                        </p>
                    </div>
                </div>


            </footer>
        )
    }

}

const mapStateToProps = state => {
    return {
        iconsData: state.footerReducer.iconsFooter,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFooterIcons: () => dispatch(setFooterIcons()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);