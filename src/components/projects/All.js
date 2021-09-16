import React from "react"
import { v4 as uuidv4 } from 'uuid'

const All = ({ projects }) => {

  return (
    <div className="row">

      {
        projects && projects.length > 0 ?

          projects.map((proj, index) =>

            <div className="col-12 col-sm-6 col-xl-3 mb-3" key={uuidv4()}>

              <div className="card card-body bg-light" id={proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + index}>
                <img className="card-img-top img-thumbnail rounded" src={proj.pGallery[0]} alt="Elysium Group Ltd" />

                <div className="card-img-overlay">
                  <button type="button" className="btn btn-outline-warning btn-sm" data-toggle="modal" data-target={`.${proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + index}`}>
                    View more ...
                  </button>
                </div>

                <div className="project-info p-2 text-center text-uppercase">
                  <h6>{proj.pName}</h6>
                  <p>{proj.pLocation}</p>
                </div>
              </div>

              <div className={`modal fade ${proj.pClient.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + index}`} tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-xl">
                  <div className="modal-content">

                    <div className="container page-top">

                      <div className="row img-row">

                        {proj.pGallery.map(pImage =>

                          <div className="col-lg-3 col-md-4 col-xs-6 thumb" key={uuidv4()} onClick={(e) => e.preventDefault()}>
                            <a href={pImage} className="fancybox" id="fancybox" rel="ligthbox">
                              <img src={pImage} className="zoom img-fluid" alt="" />
                            </a>
                          </div>)}
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

            </div>) : <h6 className="text-danger font-weight-bolder mx-auto mt-3">There is no projects available!</h6>}
    </div>)
};

export default All;