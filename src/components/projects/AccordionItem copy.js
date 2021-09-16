import React from "react";
import All from "./All";
import Ongoing from "./Ongoing";
import Finished from "./Finished";

const AccordionItem = ({ typesOfProject, projects, active, onToggle }) => {

    const proj = projects.filter(proje => proje.pType === typesOfProject.projectType)
    const completedProj = projects.filter(proje => (proje.pType === typesOfProject.projectType && proje.finished))
    const ongoingProj = projects.filter(proje => (proje.pType === typesOfProject.projectType && !proje.finished))

    return (
        <li className={`accordion_item ${active ? "active" : ""}`}>

            <div className="title font-weight-bolder" onClick={onToggle}>
                <h5 className="m-0">{typesOfProject.projectType}</h5>
                <span className="control">{active ? "-" : "+"} </span>
            </div>

            <div
                className="tabs_wrapper row"
                style={active ? { height: "100%" } : { height: "0px" }}>

                <div className="col-12 col-sm-3 col-lg-2">

                    <div className="nav flex-sm-column justify-content-around nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                        <a className="nav-link active btn-sm text-uppercase" id="v-pills-allProjects-tab" data-toggle="pill" href="#v-pills-allProjects" role="tab" aria-controls="v-pills-allProjects" aria-selected="true">
                            All
                        </a>

                        <a className="nav-link btn-sm text-uppercase" id="v-pills-completed-tab" data-toggle="pill" href="#v-pills-completed" role="tab" aria-controls="v-pills-completed" aria-selected="false">
                            Completed
                        </a>

                        <a className="nav-link btn-sm text-uppercase" id="v-pills-ongoing-tab" data-toggle="pill" href="#v-pills-ongoing" role="tab" aria-controls="v-pills-ongoing" aria-selected="false">
                            Ongoing
                        </a>
                    </div>

                </div>


                <div className="col-12 col-sm-9 col-lg-10">
                    <div className="tab-content" id="v-pills-tabContent">

                        <div className="tab-pane fade show active" id="v-pills-allProjects" role="tabpanel" aria-labelledby="v-pills-allProjects-tab">
                            <All projects={proj && proj} />
                        </div>

                        <div className="tab-pane fade" id="v-pills-completed" role="tabpanel" aria-labelledby="v-pills-completed-tab" >
                            <Finished projects={completedProj && completedProj} />
                        </div>

                        <div className="tab-pane fade" id="v-pills-ongoing" role="tabpanel" aria-labelledby="v-pills-ongoing-tab">
                            <Ongoing projects={ongoingProj && ongoingProj} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default AccordionItem;