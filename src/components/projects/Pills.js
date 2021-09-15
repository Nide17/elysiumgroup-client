import React from 'react'

const Pills = () => {
    return (
        <>
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
        </>
    )
}

export default Pills