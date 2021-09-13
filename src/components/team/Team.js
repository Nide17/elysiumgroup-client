import React from 'react'
import Members from './Members'

const Team = () => {
    return (
        <section className="about-section py-0 py-lg-4">
            <div className="container about-container">

                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center py-3 font-weight-bolder w-100">Our Team</h2>
                        </div>
                    </div>

                    <div className="col-12 mt-2 members" style={{ display: "flex", justifyContent: "center" }}>
                        <Members />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Team