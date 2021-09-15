import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setProjects } from "../../redux/projects/projects.actions";
import { typesOfProjects } from "./data";
import AccordionItem from "./AccordionItem";

const Projects = ({ projects, setProjects }) => {

    useEffect(() => { setProjects() });

    const [clicked, setClicked] = useState("0");
    const handleToggle = (index) => {

        if (clicked === index) {
            return setClicked("0");
        }
        setClicked(index);
    }

    return (

        <section className="projects-section py-0 py-lg-4" id="projects">
            <div className="projects-container container">

                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center py-3 font-weight-bolder">Projects</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ul className="accordion pl-0">
                            {typesOfProjects.map((typesOfProject, index) =>

                            (<AccordionItem
                                onToggle={() => handleToggle(index)}
                                active={clicked === index}
                                key={index}
                                typesOfProject={typesOfProject}
                                projects={projects} />))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    projects: state.projectsReducer.dataProjects,
})

export default connect(mapStateToProps, { setProjects })(Projects);