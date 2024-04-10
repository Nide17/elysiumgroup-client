import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Model from './ThreeDotsModel'
import { openNav } from '@/redux/slices/appSlice'
import { showServices, showProjects, handleClose } from '@/redux/slices/appSlice'
import { setHeight } from '@/redux/slices/appSlice'

const Header = () => {

    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => { dispatch(setHeight(document.querySelector("body").clientHeight)) }, [dispatch])
    const bodyElement = document.body

    const contentHeight = useSelector(state => state.app.contentHeight)
    const menuOpen = useSelector(state => state.app.menuOpen)
    const services = useSelector(state => state.services.services)
    const projects = useSelector(state => state.projects.projects)
    const isServices = useSelector(state => state.isServices)
    const isProjects = useSelector(state => state.isProjects)

    let headerClassName = 'header-section pt-2 pt-lg-4 pb-3 mb-2'
    let classNameNav = 'main-menu'

    let menuProjectsLinkClassName = 'main-link projects-link header__subnav-control'
    let menuServicesLinkClassName = 'main-link services-link header__subnav-control'

    menuOpen ? classNameNav += ' menu-opened' : null
    menuOpen ? bodyElement.classList.add("menu-open") : bodyElement.classList.remove("menu-open")

    // Mobile
    menuOpen && isProjects ?
        headerClassName += ' header-section--submenu-open header-section--menu-open header-section--enhanced header-section--active-link-0' :
        menuOpen && isServices ?
            headerClassName += ' header-section--submenu-open header-section--menu-open header-section--enhanced header-section--active-link-1' :

            // Larger
            isProjects ?
                headerClassName += ' header-section--submenu-open header-section--enhanced header-section--active-link-0' :
                isServices ?
                    headerClassName += ' header-section--submenu-open header-section--enhanced header-section--active-link-1' :

                    // Mobile
                    menuOpen ?
                        headerClassName += ' header-section--menu-open header-section--enhanced' :
                        headerClassName += ' header-section--enhanced header-section--active-link--1'

    isProjects ? menuProjectsLinkClassName += ' header__subnav-control--is-active header__subnav-control--is-highlighted' :
        menuProjectsLinkClassName = 'main-link personal-link header__subnav-control header__subnav-control--is-closing'

    isServices ? menuServicesLinkClassName += ' header__subnav-control--is-active header__subnav-control--is-highlighted' :
        menuServicesLinkClassName = 'main-link business-link header__subnav-control'


    const allServices = services.map((service) => {
        // Destructuring service object
        const { _id, sName, sTitle } = service

        return (
            <ul className="submenu-col" key={_id}>
                <li>
                    <a href={`/services/#${sTitle}`} >
                        {sName}
                    </a>
                </li>
            </ul>
        )
    })

    const allProjects = projects.map((project) => {
        // Destructuring proj object
        const { _id, pName, pKey } = project
        return (
            <ul className="submenu-col" key={_id}>
                <li>
                    <a href={`/projects/#${pKey}`} >
                        {pName}
                    </a>
                </li>
            </ul>
        )
    })

    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password') { return null }
    else {
        return (
            <header className={headerClassName}>
                <div>
                    <div className="header-container container">

                        <div className="contain-btn">
                            {/* <button className="btn-menu small-button" type="button"> */}
                            <button className="btn-menu small-button" type="button"
                                onClick={() => dispatch(openNav())}>
                                Menu
                            </button>
                        </div>

                        <div className="logo-container text-center d-flex justify-content-center">
                            <a href="/" className="logo-text logo-url">
                                Elysium Group
                            </a>
                            <div className="elysgp">
                                <p className="eg-title">ELYSIUM GROUP</p>
                                <p className="eg-moto">SYNERGY&nbsp;<span>|</span>&nbsp;INNOVATION&nbsp;<span>|</span>&nbsp;EXCELLENCE</p>
                            </div>
                        </div>

                        <nav id="mySidenav" className={classNameNav} style={{ height: menuOpen ? contentHeight : '' }}>
                            <ul className="menu-list">
                                <li>
                                    <a href="/"
                                        className="main-link"
                                        style={{ borderBottom: location.pathname === "/" ? "2px solid #f0ad4e" : null }}>
                                        Home
                                    </a>
                                </li>

                                <li>
                                    <a href="/about"
                                        className="main-link"
                                        style={{ borderBottom: location.pathname === "/about" ? "2px solid #f0ad4e" : null }}>
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a href="/services"
                                        className={menuServicesLinkClassName}
                                        style={{ borderBottom: location.pathname === "/services" ? "2px solid #f0ad4e" : null }}>
                                        Expertise
                                    </a>

                                    <div className="submenu-wrapper" id="submenu-Services" style={{
                                        display:
                                            isServices ? 'block' : 'none'
                                    }}>

                                        <div className="container">

                                            <div className="header-section__subnav">
                                                <span className="closer-mobile">
                                                    <button href="/services" className="closer"
                                                        onClick={() => dispatch(showServices())}>
                                                        {/* <button href="/services" className="closer"> */}
                                                        {/* header__subnav-control */}
                                                        Expertise</button>
                                                </span>

                                                <div className="submenu-cols">
                                                    {allServices}
                                                </div>

                                                <span className="closer-desktop">
                                                    {/* <button href="/#" title="Close" className="closer"> */}
                                                    <button href="/#" title="Close" className="closer"
                                                        onClick={() => dispatch(handleClose())}>
                                                        Close</button>
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                </li>

                                <li>
                                    <a href="/projects"
                                        className={menuProjectsLinkClassName}
                                        style={{ borderBottom: location.pathname === "/projects" ? "2px solid #f0ad4e" : null }}>
                                        Projects
                                    </a>

                                    <div className="submenu-wrapper" id="submenu-Projects" style={{
                                        display:
                                            isProjects ? 'block' : 'none'
                                    }}>

                                        <div className="container">

                                            <div className="header-section__subnav">
                                                <span className="closer-mobile">
                                                    <button href="/projects" className="closer"
                                                        onClick={() => dispatch(showProjects())}>
                                                        {/* <button href="/projects" className="closer"> */}
                                                        Projects
                                                    </button>
                                                </span>

                                                <div className="submenu-cols">
                                                    {allProjects}
                                                </div>

                                                <span className="closer-desktop"><button href="/#" className="closer" title="Close"
                                                    onClick={() => dispatch(handleClose())}>
                                                    {/* <span className="closer-desktop"><button href="/#" className="closer" title="Close"> */}
                                                    Close
                                                </button>
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                </li>

                                <li>
                                    <a href="/team"
                                        className={menuProjectsLinkClassName}
                                        style={{ borderBottom: location.pathname === "/team" ? "2px solid #f0ad4e" : null }}>
                                        Our Team
                                    </a>
                                </li>

                                <li>
                                    <a href="/contact"
                                        className="main-link"
                                        style={{ borderBottom: location.pathname === "/contact" ? "2px solid #f0ad4e" : null }}>
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="three-dots d-none" data-toggle="modal" data-target="/#Modal">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>

                        {/* <!-- Modal --> */}
                        <Model />

                    </div>
                </div>
            </header>
        )
    }

}

export default Header