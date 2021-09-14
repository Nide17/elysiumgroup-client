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

                        <>
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="text-center py-3 font-weight-bolder w-100">{memberToView && memberToView.memberName}</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="">
                                    <div className="card-body">
                                    <p>{memberToView && memberToView.memberDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    members: state.membersReducer.members
})
export default connect(mapStateToProps, { setMembers })(ViewBio)