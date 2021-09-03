import React from 'react';
// import Clients from './Clients'
import Members from './Members'

const About = () => {

    return (
        <section className="about-section">
            <div className="container about-container">

                <div className="row">

                    <div className="col-12 elysium-title-wrapper">
                        <h1 className="elysium-title">ELYSIUM GROUP</h1>
                        <h3>About us</h3>

                        <p>ELYSIUM GROUP LTD has been established in November 2019 to provide
                            Consultancy services in Architectural and Engineering activities and related technical
                            consultancy, Consultancy in Project Management and Estate Construction,
                            Consultancy in the field of construction, Control and supervision of works and real
                            estate appraisals Research and experimental development on natural sciences
                            and engineering, Technical testing and analysis, Specialized design activities, ICT
                            Consultancy, Business development and management consultancy, accounting,
                            Auditing, book-keeping Consultancy and other scientific research.
                        </p>

                        <p>The firm is organized by team of professionals, whose contribution have already
                            enriched the quality of services rendered by local as well as international firms, for
                            providing exemplary high quality professional consultancy services to the required
                            standard.
                        </p>

                        <p>The firm is organized to give clients the best possible service by developing the
                            organization constantly to keep abreast of technological developments. The quality
                            assurance procedures are very effective and they are updated regularly to match
                            new requirements.</p>

                        <strong>ELYSIUM GROUP LTD places special emphasis on the ability of co-operation and synergetic innovation.</strong>
                    </div>

                </div>

                <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                        <h4>Our Vision</h4>
                        <p>Our Vision is to be a competent international Consultancy Institution.</p>
                    </div>

                    <div className="col-12 col-sm-6">
                        <h4>Our Mission</h4>
                        <p>Providing high quality and cost effective Consultancy Services in time to our clients by keeping strong team spirit, innovation and dynamism</p>
                    </div>

                    <div className="w-50 mx-auto">
                        <h4 className="ml-2">Our Core Values</h4>
                        <table className="table font-weight-bold">

                            <tbody>
                                <tr>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Teamwork</span></td>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Ethical</span></td>
                                </tr>
                                <tr>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Synergy</span></td>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Professionalism</span></td>
                                </tr>
                                <tr>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Innovation</span></td>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Dynamism</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-lg-5">
                    <h3 className="ml-2 mx-auto">Our Team</h3>
                    <div className="col-12 mt-2 members" style={{ display: "flex", justifyContent: "center" }}>
                        <Members />
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-12 elysium-clients"><Clients /></div>
                </div> */}

            </div>

        </section>);
}

export default About;