import React, { useEffect } from 'react';
import Model from './ThreeDotsModel';
import { useLocation } from "react-router-dom";

// REDUX for dispatching service action
import { connect } from "react-redux";
import { setServices } from "../../redux/services/services.actions";
import { setProjects } from "../../redux/projects/projects.actions";

const Header = (props) => {

    useEffect(() => {
        // Inside this callback function we perform our side effects.
        props.setServices();
        props.setProjects();
    });

    const location = useLocation()

    let headerClassName = 'header-section pt-2 pt-lg-4 pb-3';
    let classNameNav = 'main-menu';

    let menuProjectsLinkClassName = 'main-link projects-link header__subnav-control';
    let menuServicesLinkClassName = 'main-link services-link header__subnav-control';

    props.openMenu ? classNameNav += ' menu-opened' : classNameNav = 'main-menu';

    // Mobile
    props.openMenu && props.isProjects ?
        headerClassName += ' header-section--submenu-open header-section--menu-open header-section--enhanced header-section--active-link-0' :
        props.openMenu && props.isServices ?
            headerClassName += ' header-section--submenu-open header-section--menu-open header-section--enhanced header-section--active-link-1' :

            // Larger
            props.isProjects ?
                headerClassName += ' header-section--submenu-open header-section--enhanced header-section--active-link-0' :
                props.isServices ?
                    headerClassName += ' header-section--submenu-open header-section--enhanced header-section--active-link-1' :

                    // Mobile
                    props.openMenu ?
                        headerClassName += ' header-section--menu-open header-section--enhanced' :
                        headerClassName += ' header-section--enhanced header-section--active-link--1';

    props.isProjects ? menuProjectsLinkClassName += ' header__subnav-control--is-active header__subnav-control--is-highlighted' : menuProjectsLinkClassName = 'main-link personal-link header__subnav-control header__subnav-control--is-closing';

    props.isServices ? menuServicesLinkClassName += ' header__subnav-control--is-active header__subnav-control--is-highlighted' : menuServicesLinkClassName = 'main-link business-link header__subnav-control';


    const allServices = props.services.map((service) => {
        // Destructuring service object
        const { id, sName, sTitle } = service;

        return (

            <ul className="submenu-col" key={id}>
                <li>
                    <a href={`/services/#${sTitle}`} >
                        {sName}
                    </a>
                </li>
            </ul>
        );
    });

    const allProjects = props.projects.map((project) => {
        // Destructuring proj object
        const { id, pName, pKey } = project;

        return (
            <ul className="submenu-col" key={id}>
                <li>
                    <a href={`/projects/#${pKey}`} >
                        {pName}
                    </a>
                </li>
            </ul>
        );
    });

    return (
        <header className={headerClassName}>
            <div>
                <div className="header-container container">

                    <div className="contain-btn">
                        <button className="btn-menu small-button" type="button" onClick={props.menuOpened}>
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

                    <nav id="mySidenav" className={classNameNav} style={{ height: props.openMenu ? props.contentHeight : '' }}>
                        <ul className="menu-list">
                            <li>
                                <a href="/" 
                                className="main-link" 
                                    style={{ borderBottom: location.pathname === "/" ? "2px solid #f0ad4e" : null}}>
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
                                        props.isServices ? 'block' : 'none'
                                }}>

                                    <div className="container">

                                        <div className="header-section__subnav">
                                            <span className="closer-mobile">
                                                <button href="/services" className="closer" onClick={props.showServices}>
                                                    {/* header__subnav-control */}
                                                    Expertise</button>
                                            </span>

                                            <div className="submenu-cols">
                                                {allServices}
                                            </div>

                                            <span className="closer-desktop">
                                                <button href="/#" title="Close" className="closer" onClick={props.closeHandler}>
                                                    Close</button>
                                            </span>

                                        </div>
                                    </div>
                                </div>

                            </li>

                            <li>
                                <a href="/" 
                                className={menuProjectsLinkClassName} 
                                onClick={props.showProjects}
                                    style={{ borderBottom: location.pathname === "/projects" ? "2px solid #f0ad4e" : null }}>
                                    Portfolio
                                </a>

                                <div className="submenu-wrapper" id="submenu-Projects" style={{
                                    display:
                                        props.isProjects ? 'block' : 'none'
                                }}>

                                    <div className="container">

                                        <div className="header-section__subnav">
                                            <span className="closer-mobile">
                                                <button href="/projects" className="closer" onClick={props.showProjects}>
                                                    Portfolio
                                                </button>
                                            </span>

                                            <div className="submenu-cols">
                                                {allProjects}
                                            </div>

                                            <span className="closer-desktop"><button href="/#" className="closer" title="Close" onClick={props.closeHandler}>Close</button></span>

                                        </div>
                                    </div>
                                </div>

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
    );
}


const mapStateToProps = (state) => {
    return {
        services: state.servicesReducer.dataServices,
        projects: state.projectsReducer.dataProjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setServices: () => dispatch(setServices()),
        setProjects: () => dispatch(setProjects()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);