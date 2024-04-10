import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Social from './Social'

const Footer = () => {

    const location = useLocation()
    const iconsData = useSelector(state => state.iconsData.iconsFooter)

    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password') { return null }

    else {
        return (
            <footer className="md:mt-auto bg-[#009cde] text-white">
                <div className="px-2 py-4 p-lg-4 flex justify-around md:justify-center flex-wrap">

                    <div className="lg:mx-12 sm:mx-2">
                        <h4 className="text-center font-black mb-3">Connect with us</h4>
                        <ul className="social-buttons d-lg-flex justify-content-center lg:mt-8">
                            {iconsData.map((icon) => {
                                return (
                                    <Social icon={icon} key={icon.id} />
                                )
                            })}
                        </ul>
                    </div>

                    <div className="lg:mx-12 sm:mx-2 mt-3 lg:mt-0 w-full md:w-auto text-center md:text-start ">
                        <h4 className='font-black mb-3'>Contacts</h4>
                        <ul className="list-unstyled mb-0 md:d-flex flex-column justify-content-end">
                            <li><i className="fa fa-phone fa-lg"></i>&nbsp;(+250)788623823</li>
                            <li><i className="fa fa-envelope fa-md"></i>&nbsp;<small>info@elysiumgroup.org</small></li>
                            <li><i className="fa fa-map-marker"></i>&nbsp;<small>Kabeza, Kicukiro, Kigali</small></li>
                        </ul>
                    </div>

                    <div className="lg:mx-12 sm:mx-2 mt-3 lg:mt-0 hidden md:block">
                        <h4 className='font-black mb-3'>Business Hours</h4>
                        <ul className="list-unstyled d-flex flex-column justify-content-end">
                            <li><Link to="/#" className="text-white font-normal">Monday - Friday: 8am - 5pm</Link></li>
                            <li><Link to="/#" className="text-white font-normal">Saturday: 8am - 1pm</Link></li>
                            <li><Link to="/#" className="text-white font-normal">Sunday: Closed</Link></li>
                        </ul>
                    </div>

                    <div className="lg:mx-12 sm:mx-2 mt-3 lg:mt-0">
                        <h4 className='font-black'>Explore</h4>
                        <ul className="list-unstyled d-flex flex-column justify-content-start mb-0">
                            <li><a className="text-white font-normal" href="/services">Expertise</a></li>
                            <li><a className="text-white font-normal" href="/projects">Projects</a></li>
                            <li><a className="text-white font-normal" href="/about">About us</a></li>
                            <li><a className="text-white font-normal" href="/dashboard/home">Portal</a></li>
                        </ul>
                    </div>

                </div>

                <div className="bg-white">
                    <div className="">
                        <p className="text-center font-normal text-[#009cde] mb-0">
                            <small>
                                © {new Date().getFullYear()} Elysium Group Ltd - All Rights Reserved
                            </small>
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer