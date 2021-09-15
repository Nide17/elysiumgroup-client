import React from "react";
import All from "./All";
import Ongoing from "./Ongoing";
import Finished from "./Finished";
import Pills from "./Pills";

const AccordionItem = ({ typesOfProject, projects, active, onToggle }) => {

    const proj = projects.filter(proje => proje.pType === typesOfProject.projectType)

    return (
        <li className={`accordion_item ${active ? "active" : ""}`}>

            <div className="title font-weight-bolder" onClick={onToggle}>
                <h5 className="m-0">{typesOfProject.projectType}</h5>
                <span className="control">{active ? "-" : "+"} </span>
            </div>

            <div
                className="answer_wrapper row"
                style={active ? { height: "100%" } : { height: "0px" }}>

                <Pills />

                <div className="col-12 col-sm-9 col-lg-10">
                    <div className="tab-content" id="v-pills-tabContent">
                        {/* All projetcs */}
                        <div
                            className="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                        >
                            <All projects={proj && proj} />
                        </div>

                        {/* completed */}
                        <div
                            className="tab-pane fade"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                        >
                            <Finished projects={proj && proj} />
                        </div>

                        {/* Ongoing */}
                        <div
                            className="tab-pane fade"
                            id="v-pills-messages"
                            role="tabpanel"
                            aria-labelledby="v-pills-messages-tab">
                            <Ongoing projects={proj && proj} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default AccordionItem;