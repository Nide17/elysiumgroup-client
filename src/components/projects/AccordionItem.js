
import React, { useState } from 'react';
import All from "./All";
import Ongoing from "./Ongoing";
import Finished from "./Finished";

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const AccordionItem = ({ typesOfProject, projects, active, onToggle }) => {

    const proj = projects.filter(proje => proje.pType === typesOfProject.projectType)
    const completedProj = projects.filter(proje => (proje.pType === typesOfProject.projectType && proje.finished))
    const ongoingProj = projects.filter(proje => (proje.pType === typesOfProject.projectType && !proje.finished))


    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <li className={`accordion_item ${active ? "active" : ""}`}>

            <div className="title font-weight-bolder" onClick={onToggle}>
                <h5 className="m-0">{typesOfProject.projectType}</h5>
                <span className="control">{active ? "-" : "+"} </span>
            </div>

            <div
                className="tabs_wrapper row mt-2 mt-lg-3"
                style={active ? { height: "100%" } : { height: "0px" }}>

                <div className="col-12 col-sm-3 col-lg-2">

                    <Nav tabs className="flex-column">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                All
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Finished
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                Ongoing
                            </NavLink>
                        </NavItem>

                    </Nav>

                </div>

                <div className="col-12 col-sm-9 col-lg-10">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <All projects={proj && proj} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <Finished projects={completedProj && completedProj} />
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <Ongoing projects={ongoingProj && ongoingProj} />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </li>

    );
};

export default AccordionItem;