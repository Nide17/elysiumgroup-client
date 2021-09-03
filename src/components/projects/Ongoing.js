import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setProjects } from "../../redux/projects/projects.actions";

const Ongoing = (props) => {
  useEffect(() => {
    // Inside this callback function we perform our side effects.
    props.setProjects();
  });

  const onGoing = props.projects.map((proj) => {
    const { id, pName, pSrc, pLocation, pKey, pDescription, pGallery, finished } = proj;

    return !finished ? (
      // , pClient, pDate, pLocation, pDescription
      <div className="col-12 col-sm-6 col-lg-3 mb-3" key={id}>
        <div className="card card-body bg-light" id={pKey}>
          <img
            className="card-img-top img-thumbnail rounded"
            src={pSrc}
            alt="Card image1 cap"
          />

          <div
            className="card-img-overlay"
          >
            <button type="button" className="btn btn-outline-warning btn-sm" data-toggle="modal" data-target={`.ongoing${pKey}`}>
              View more ...
            </button>
          </div>

          <div className="project-info p-2 text-center text-uppercase">
            <h6>{pName}</h6>
            <p>{pLocation}</p>
          </div>
        </div>

        {/* MODAL */}
        <div className={`modal fade ongoing${pKey}`} tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">

          <div className="modal-dialog modal-xl">
            <div className="modal-content">

              <div className="container page-top">

                <div className="row img-row">

                  {/* iteration */}
                  {pGallery.map(pImage => {

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
                    <h2>{pName}</h2>
                    {pDescription}
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    ) : (
        ""
      );
  });

  return <div className="row">{onGoing}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Ongoing);
