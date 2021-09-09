import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setProjects } from "../../redux/projects/projects.actions";

const Finished = ({ projects, setProjects }) => {
  useEffect(() => {
    // Inside this callback function we perform our side effects.
    setProjects();
  });

  return (

    <div className="row">

      {
        projects.map((proj) =>

          proj.finished ? (

            <div className="col-12 col-sm-6 col-lg-3 mb-3" key={proj.id}>
              <div className="card card-body bg-light" id={proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + proj.id}>
                <img
                  className="card-img-top img-thumbnail rounded"
                  src={proj.pGallery[0]}
                  alt="Elysium Group Ltd" />

                <div className="card-img-overlay">
                  <button type="button" className="btn btn-outline-warning btn-sm" data-toggle="modal" data-target={`.finished${proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + proj.id}`}>
                    View more ...
                  </button>
                </div>

                <div className="project-info p-2 text-center text-uppercase">
                  <h6>{proj.pName}</h6>
                  <p>{proj.pLocation}</p>
                </div>
              </div>

              {/* MODAL */}
              <div className={`modal fade finished${proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + proj.id}`} tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-xl">
                  <div className="modal-content">

                    <div className="container page-top">

                      <div className="row img-row">

                        {/* iteration */}
                        {proj.pGallery.map(pImage => {

                          return (
                            <div className="col-lg-3 col-md-4 col-xs-6 thumb" key={pImage} onClick={(e) => e.preventDefault()}>
                              <a href={pImage} className="fancybox" id="fancybox" rel="ligthbox">
                                <img src={pImage} className="zoom img-fluid" alt="" />
                              </a>
                            </div>
                          )

                        })}

                      </div>

                      <div className="row desc">

                        <div className="col-12 text-center">
                          <h2>{proj.pName}</h2>
                          {proj.pDescription}
                        </div>

                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>) : (""))}
    </div>)

};
const mapStateToProps = (state) => {
  return {
    projects: state.projectsReducer.dataProjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjects: () => dispatch(setProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finished);