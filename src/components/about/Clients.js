import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setProjects } from "../../redux/projects/projects.actions";

const Clients = ({ projects, setProjects }) => {

    useEffect(() => {
        setProjects();
    });

    return (
        <section className="clients-section" id="clients">
            <div className="clients-container">
                <div className="row">
                    <div className="col-12 elysium-title-wrapper">
                        <h3>Notable Clients</h3>
                    </div>

                    {projects && projects.map((proj) => {

                        const { id, pClient, pSrc, pKey } = proj;
                        return (
                            <div className="col-12 col-md-4 col-xl-3 mb-3 col-7" key={id}>
                                <div className="card card-body bg-light py-0" id={pKey}>

                                    <div className="card-header">
                                        <small className="text-center text-uppercase">
                                            {pClient}
                                        </small>
                                    </div>
                                    <img
                                        className="card-img-top img-thumbnail rounded"
                                        src={pSrc}
                                        alt="Card image1 cap" />
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    projects: state.projectsReducer.dataProjects
})

export default connect(mapStateToProps, { setProjects })(Clients);