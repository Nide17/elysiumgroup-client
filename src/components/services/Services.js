import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setServices } from "../../redux/services/services.actions";

const Services = ({ setServices, services }) => {

  useEffect(() => {
    // Inside this callback function we perform our side effects.
    setServices();
  });

  const allServices = services.map((service) => {

    // Destructuring service object
    const { id, sName, sSrc, sDetails, sTitle } = service;

    return (

      <div className="col-12 col-sm-6 col-xl-3 mb-3" key={id}>

        <div className="card card-body py-0" id={sTitle}>

          <div className="card-header">
              <strong className="text-center text-uppercase">{sName}</strong>
          </div>

          <img
            className="card-img-top img-thumbnail rounded"
            src={sSrc}
            alt="Card image1 cap"
          />

          <div
            className="card-img-overlay"
          >
            <button type="button" className="btn btn-outline-warning btn-sm text-uppercase font-weight-bolder">
              <a href="/#" className="text-warning">View details</a>
            </button>
          </div>

          <div className="brief-info p-2">
            {/* {sDetails.length >= 95 ? (
              <p>
                {sDetails.slice(0, 93)}&nbsp;<a href="/">read more...</a>
              </p>
            ) : ( */}
                <p> {sDetails}</p>
              {/* )} */}
          </div>

        </div>

      </div>
    );
  });

  return (
    <section className="services-section py-0 py-lg-4" id="services">

      <div className="services-container container">

        <div className="row">
          <div className="col-12">
            <h2 className="text-center py-3 font-weight-bolder">Our Expertise</h2>
          </div>
        </div>

        <div className="row">{allServices}</div>

      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  services: state.servicesReducer.dataServices,
})

export default connect(mapStateToProps, { setServices })(Services)