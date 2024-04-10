import React from 'react';
import Clients from './Clients'

const About = () => {
    return (
        <section className="about-section py-0 py-lg-4">

            <div className="container">
                <h1 className="mt-8 mb-8 text-center font-weight-bolder text-2xl md:text-5xl">
                    Discover more about us.
                </h1>

                <div className="p-0 px-4 md:px-16 lg:px-80">

                    <p className='mt-4 text-sm md:text-xl'>
                        Elysium Group Ltd, founded in November 2019, offers consultancy services in Architectural and Engineering activities, Project Management, Estate Construction, Construction Consultancy, Works Supervision, Real Estate Appraisals, Research and Development in natural sciences and engineering, Technical testing and analysis, Specialized design, ICT Consultancy, Business development, Management consultancy, Accounting, Auditing, Bookkeeping, and Scientific research.
                    </p>

                    <p className='text-sm md:text-xl mt-4'>
                        Our professional team enhances service quality for local and international firms, delivering exemplary consultancy services to high standards.
                    </p>

                    <p className='text-sm md:text-xl my-4'>
                        We are committed to providing clients with the best possible service, continuously evolving to stay current with technological advancements. Our effective quality assurance procedures are regularly updated to meet new requirements.
                    </p>

                    <strong className='text-sm md:text-xl text-center'>
                        We place special emphasis on the ability of co-operation and synergetic innovation.
                    </strong>
                </div>
                <div className="my-10 px-4 md:px-16 lg:px-48">
                    <div className="my-4">
                        <h4>Our Vision</h4>
                        <p className='text-sm md:text-xl'>
                            Our Vision is to be a competent international Consultancy Institution.
                        </p>
                    </div>

                    <div className="my-4">
                        <h4>Our Mission</h4>
                        <p className='text-sm md:text-xl'>
                            Providing high quality and cost effective Consultancy Services in time to our clients by keeping strong team spirit, innovation and dynamism
                        </p>
                    </div>

                    <div className="w-full md:w-50 mx-auto mt-10">
                        <h4 className="md:ml-32 md:my-4">Our Core Values</h4>
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
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Excellence</span></td>
                                    <td className="border-0"><span role="img" aria-label="emoji">👉 Dynamism</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="px-0 md:px-16 lg:px-48">
                    <div className="elysium-clients">
                        <Clients />
                    </div>
                </div>
            </div>

        </section>);
}

export default About;