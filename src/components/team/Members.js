import React, { useEffect } from 'react'
import { Media } from 'reactstrap'
import { connect } from "react-redux";
import { setMembers } from "../../redux/members/members.actions";

const Members = ({ setMembers, members }) => {

    useEffect(() => {
        setMembers();
    });

    if (members != null) {
        const membersAll = members.map(member =>

            <Media key={member.id}>

                <Media left>
                    <Media object src={member.memberImage} alt={member.memberName} style={{ paddingRight: "10px" }} className="mr-lg-5" />
                </Media>

                <Media body className="my-auto ml-lg-5">
                    <Media heading>{member.memberName}</Media>

                    <h6>{member.designation}</h6>
                    <p className="d-none d-lg-block m-0"><i className="member-phone">{member.memberEducation}</i></p>

                    <div id="viewBio" className="details mt-1 mt-lg-2">
                        <div className="card">
                            <button class="btn btn-link p-0 mx-auto">
                                <a href={`/view-bio/${member.id}`}>View Biography</a> &nbsp;<i class="fa fa-eye" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </Media>
            </Media>)

        return (<Media list>{membersAll}</Media>);
    }
}

const mapStateToProps = state => ({
    members: state.membersReducer.members
})

export default connect(mapStateToProps, { setMembers })(Members)