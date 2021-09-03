import React, { useState, useEffect } from 'react'
import { Media } from 'reactstrap'
import { connect } from "react-redux";
import { setMembers } from "../../redux/members/members.actions";

const Members = ({ setMembers, members }) => {

    const [clickedMember, setClickedMember] = useState('')
    const [collapsed, setCollapsed] = useState('true')

    useEffect(() => {
        setMembers();
    });

    const AccordionHeader = ({ value }) => {

        const { memberName } = value
        const collapsedClass = clickedMember === memberName && collapsed ? "btn btn-link p-0 mx-auto" : 'btn btn-link p-0 mx-auto collapsed'
        const ariaExpanded = clickedMember === memberName && collapsed ? "true" : "false";
        const biography = clickedMember === memberName && collapsed ? "Biography" : "View Biography";
        const plusIcon = clickedMember === memberName && collapsed ? "fa fa-minus" : "fa fa-plus";

        const collapseClick = () => {
            setCollapsed(!collapsed)
            setClickedMember(memberName)
        }

        return (
            <div className="card-header w-100 m-0 p-1 d-flex justify-content-center" id={`heading${memberName && memberName.split(' ').join('-')}`} onClick={collapseClick}>

                <button className={collapsedClass} data-toggle="collapse" data-target={`#collapse${memberName && memberName.split(' ').join('-')}`} aria-expanded={ariaExpanded} aria-controls={`collapse${memberName && memberName.split(' ').join('-')}`} onClick={collapseClick} >
                    {biography} &nbsp;<i className={plusIcon}></i>
                </button>
            </div>)
    }

    const AccordionBody = ({ value }) => {

        const { memberName, memberDescription } = value
        const collapseCourses = clickedMember === memberName && collapsed ? "collapse show" : "collapse"

        return (
            <div id={`collapse${memberName && memberName.split(' ').join('-')}`} className={collapseCourses} aria-labelledby={`heading${memberName && memberName.split(' ').join('-')}`} data-parent="#accordionElysium">
                <div className="card-body"><p>{memberDescription}</p></div>
            </div>)
    }
    

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
                    <p className="font-weight-bolder m-0 mt-0 mb-lg-1">
                        <span><i class="fa fa-mobile-phone mr-2"></i>
                            <strong className="member-phone">{member.memberPhone}</strong></span></p>

                    <div id="accordionElysium" className="details mt-1 mt-lg-2">
                        <div className="card">
                            <AccordionHeader value={member} />
                            <AccordionBody value={member} />
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