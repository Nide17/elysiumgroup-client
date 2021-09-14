import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { setMembers } from "../../redux/members/members.actions";
import { useParams } from 'react-router-dom'

const ViewBio = ({ setMembers, members }) => {

    useEffect(() => {
        setMembers();
    });

    const { memberId } = useParams()
    const memberToView = members && members.find(member => member.id === parseInt(memberId))

    return (
        <section className="about-section py-0 py-lg-4">

            <div className="container about-container">

                <div className="row">

                    <div className="col-12 col-sm-4 memberImg d-flex align-items-center justify-content-center">
                        <img className="w-100" src={memberToView && memberToView.memberImage} alt={memberToView && memberToView.memberName} />
                    </div>

                    <div className="col-12 col-sm-8">
                        <h2 className="text-center py-3 font-weight-bolder w-100">{memberToView && memberToView.memberName}</h2>

                        <h4>{memberToView && memberToView.designation}</h4>
                        <h6>{memberToView && memberToView.memberEducation}</h6>

                        <div className="profile-desc mt-lg-4">
                            <p>{memberToView && memberToView.memberDescription}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    members: state.membersReducer.members
})
export default connect(mapStateToProps, { setMembers })(ViewBio)