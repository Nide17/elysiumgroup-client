import React from "react";
import All from "./All";
import Ongoing from "./Ongoing";
import Finished from "./Finished";

const Projects = () => {
  
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center py-3">Projects</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-3 col-lg-2">
            <div
              className="nav flex-sm-column justify-content-around nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active btn-sm text-uppercase"
                id="v-pills-home-tab"
                data-toggle="pill"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                All
              </a>

              <a
                className="nav-link btn-sm text-uppercase"
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                Completed
              </a>

              <a
                className="nav-link btn-sm text-uppercase"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Ongoing
              </a>
            </div>
          </div>

          <div className="col-12 col-sm-9 col-lg-10">
            <div className="tab-content" id="v-pills-tabContent">
              {/* All projetcs */}
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <All />
              </div>

              {/* completed */}
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <Finished />
              </div>

              {/* Ongoing */}
              <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <Ongoing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
